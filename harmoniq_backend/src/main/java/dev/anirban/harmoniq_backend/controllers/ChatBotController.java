package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.chat.ChatbotRequest;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;


@RestController
@RequiredArgsConstructor
public class ChatBotController {
    private final ChatbotService service;

    @PostMapping(value = UrlConstants.PROMPT_CHATBOT_ENDPOINT, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ResponseWrapper<String>> handleChatbotRequest(
            @RequestBody ChatbotRequest chatbotRequest,
            @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader
    ) {
        return service
                .generateResponse(chatbotRequest, authHeader)
                .map(words -> new ResponseWrapper<>("", words));
    }
}