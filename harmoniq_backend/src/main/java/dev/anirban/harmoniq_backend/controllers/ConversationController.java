package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.chat.ChatMessageDto;
import dev.anirban.harmoniq_backend.dto.chat.ChatbotRequest;
import dev.anirban.harmoniq_backend.dto.chat.ConversationDto;
import dev.anirban.harmoniq_backend.dto.chat.ConversationRequest;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.entity.ChatMessage;
import dev.anirban.harmoniq_backend.entity.Conversation;
import dev.anirban.harmoniq_backend.service.conversation.ChatbotService;
import dev.anirban.harmoniq_backend.service.conversation.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;


@RestController
@RequiredArgsConstructor
public class ConversationController {
    // this class contains the business logic for the conversation
    private final ConversationService conversationService;
    private final ChatbotService chatbotService;

    // This creates a conversation window in the database
    @PostMapping(UrlConstants.CREATE_CONVERSATION_ENDPOINT)
    public ResponseWrapper<ConversationDto> handleCreateConversationRequest(
            @RequestBody ConversationRequest conversationRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        ConversationDto conversationDto = conversationService
                .create(conversationRequest, userDetails)
                .toConversationDto();

        return new ResponseWrapper<>("Conversation Window Created Successfully !!", conversationDto);
    }

    // This fetches all the conversations for a certain user
    @GetMapping(UrlConstants.FETCH_CONVERSATION_BY_USER_ENDPOINTS)
    public ResponseWrapper<Page<ConversationDto>> handleConversationsForCertainUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ConversationDto> conversationDto = conversationService
                .findByCreatedBy_EmailOrderByCreatedAtDesc(userDetails, PageRequest.of(page, size))
                .map(Conversation::toConversationDto);

        return new ResponseWrapper<>("Conversations for the user is fetched successfully!!", conversationDto);
    }

    // This function returns the conversation history
    @GetMapping(UrlConstants.FETCH_CONVERSATION_HISTORY_ENDPOINT)
    public ResponseWrapper<Page<ChatMessageDto>> handleConversationHistoryRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable(value = "id") String conversationId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Page<ChatMessageDto> chatMessageDto = conversationService
                .findByConversation_IdOrderByCreatedAtDesc(conversationId, PageRequest.of(page, size))
                .map(ChatMessage::toChatMessageDto);

        return new ResponseWrapper<>("Conversation History fetched Successfully !!", chatMessageDto);
    }

    @PostMapping(value = UrlConstants.PROMPT_CHATBOT_ENDPOINT, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ResponseWrapper<String>> handleIncomingMessageRequest(
            @RequestBody ChatbotRequest chatbotRequest,
            @RequestHeader(value = HttpHeaders.AUTHORIZATION) String authHeader,
            @PathVariable(value = "id") String conversationId
    ) {
        return chatbotService
                .generateResponse(chatbotRequest, authHeader, conversationId)
                .map(words -> new ResponseWrapper<>("", words));
    }

    @DeleteMapping(UrlConstants.DELETE_CONVERSATION_ENDPOINT)
    public ResponseWrapper<Void> handleDeleteConversationRequest(
            @PathVariable(value = "id") String id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        conversationService.deleteById(id, userDetails);
        return new ResponseWrapper<>("Deleted the conversation !!", null);
    }
}