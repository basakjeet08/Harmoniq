package dev.anirban.harmoniq_backend.service.chat;

import dev.anirban.harmoniq_backend.dto.chat.ChatbotRequest;
import dev.anirban.harmoniq_backend.entity.chat.Conversation;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.security.JwtService;
import dev.anirban.harmoniq_backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;

import static org.springframework.ai.chat.client.advisor.AbstractChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY;


@Service
@RequiredArgsConstructor
@Slf4j
public class ChatbotService {
    private final JwtService jwtService;
    private final UserService userService;
    private final ChatClient chatbotChatClient;
    private final ConversationService conversationService;

    // This function validates the user -> authentication and authorization
    private User validateUser(String authHeader) {

        // If no token is passed then we invalidate
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnAuthorized();
        }

        // Getting the required tokens
        final String jwtToken = authHeader.substring(7);
        final String username = jwtService.extractUsername(jwtToken);

        // Checking if the username is null
        if (username == null)
            throw new UnAuthorized();

        // Fetching the user details from the service
        User user = userService.findByEmail(username);

        // Checking if the user token is valid or not
        if (!jwtService.isTokenValid(jwtToken, user))
            throw new UnAuthorized();

        // Checking if the user has the required roles or not
        if (user.getRole() == User.Type.GUEST)
            throw new UnAuthorized();

        return user;
    }

    // This function generate the Chatbot response
    public Flux<String> generateResponse(ChatbotRequest chatbotRequest, String authHeader, String conversationId) {
        log.info("(|) - Generating prompt response for conversation Id - {}", conversationId);

        // Getting the validated User (If he is a valid user)
        User user = validateUser(authHeader);

        // Checking if the user has created the conversation or not
        Conversation savedConversation = conversationService.findById(conversationId);
        if (!savedConversation.getCreatedBy().getEmail().equals(user.getEmail()))
            throw new UnAuthorized();

        return chatbotChatClient
                .prompt()
                .advisors(advisorSpec -> advisorSpec.param(CHAT_MEMORY_CONVERSATION_ID_KEY, conversationId))
                .user(chatbotRequest.getPrompt())
                .stream()
                .content()
                .bufferTimeout(3, Duration.ofSeconds(1))
                .map((word -> String.join("", word)));
    }
}