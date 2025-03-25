package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.chat.ChatbotRequest;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;


@Service
@RequiredArgsConstructor
public class ChatbotService {
    private final JwtService jwtService;
    private final UserService userService;
    private final ChatClient chatClient;

    // This function validates the user -> authentication and authorization
    public User validateUser(String authHeader) {

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
        User user = userService
                .findByEmail(username)
                .orElseThrow(() -> new UserNotFound(username));

        // Checking if the user token is valid or not
        if (!jwtService.isTokenValid(jwtToken, user))
            throw new UnAuthorized();

        // Checking if the user has the required roles or not
        if (user.getRole() == User.Type.GUEST)
            throw new UnAuthorized();

        return user;
    }

    // This function generate the Chatbot response
    public Flux<String> generateResponse(ChatbotRequest chatbotRequest, String authHeader) {
        // Getting the validated User (If he is a valid user)
        User user = validateUser(authHeader);

        return chatClient
                .prompt()
                .system("You are a psychiatrist who's name is Mr. Cho and you listen to the coming users and " +
                        "responds to their queries appropriately. Current you are talking to " + user.getName() +
                        ". Please maintain a good heart and answer more human like showing empathy and feelings.")
                .user(chatbotRequest.getPrompt())
                .stream()
                .content()
//                .bufferTimeout(5, Duration.ofSeconds(2))
//                .map((word -> String.join("", word)))
                .doOnComplete(() -> System.out.println("(/) - Streaming completed successfully !!"))
                .doOnError((error) -> System.out.println("(/) - Error streaming: " + error.getMessage()))
                .doFinally((signal) -> System.out.println("(/) - Stream ended with signal: " + signal));
    }
}