package dev.anirban.harmoniq_backend.chatbot;

import dev.anirban.harmoniq_backend.entity.ChatMessage;
import dev.anirban.harmoniq_backend.service.conversation.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.messages.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomChatMemoryImpl implements ChatMemory {

    // Injecting the conversation service
    private final ConversationService service;

    @Override
    public void add(String conversationId, List<Message> messages) {
        service.addMessages(conversationId, messages);
    }

    // This function parses the chat messages to the individual classes required
    private Message parseChatMessage(ChatMessage chatMessage) {
        if (chatMessage.getMessageType() == MessageType.USER)
            return new UserMessage(chatMessage.getText());
        else if (chatMessage.getMessageType() == MessageType.ASSISTANT)
            return new AssistantMessage(chatMessage.getText());
        else
            return new SystemMessage(chatMessage.getText());
    }

    @Override
    // This function fetches the conversation by the id and then returns all the Messages in it
    public List<Message> get(String conversationId, int lastN) {
        return service
                .findByConversation_IdOrderByCreatedAtDesc(conversationId, PageRequest.of(0, 20))
                .stream()
                .map(this::parseChatMessage)
                .toList()
                .reversed();
    }

    @Override
    public void clear(String conversationId) {
        service.deleteById(conversationId);
    }
}