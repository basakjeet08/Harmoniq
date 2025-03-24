package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.chat.ChatbotRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequiredArgsConstructor
public class ChatBotController {
    private final ChatClient chatClient;

    @PostMapping(value = UrlConstants.PROMPT_CHATBOT_ENDPOINT, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @PreAuthorize("hasAnyAuthority('MODERATOR' , 'MEMBER')")
    public Flux<String> handleChatbotRequest(
            @RequestBody ChatbotRequest chatbotRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return chatClient
                .prompt()
                .system("You are a psychiatrist who is here to hear the users out and give a suitable response to their situations")
                .system("You are current talking to + " + userDetails.getUsername())
                .user(chatbotRequest.getPrompt())
                .stream()
                .content();
    }
}