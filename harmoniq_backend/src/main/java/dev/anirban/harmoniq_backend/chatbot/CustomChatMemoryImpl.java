package dev.anirban.harmoniq_backend.chatbot;

import dev.anirban.harmoniq_backend.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.messages.Message;
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

    @Override
    public List<Message> get(String conversationId, int lastN) {
        return service.getAllMessagesOfConversation(conversationId);
    }

    @Override
    public void clear(String conversationId) {
        service.deleteById(conversationId);
    }
}