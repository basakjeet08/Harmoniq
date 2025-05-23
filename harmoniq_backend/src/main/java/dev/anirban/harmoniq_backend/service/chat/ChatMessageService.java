package dev.anirban.harmoniq_backend.service.chat;

import dev.anirban.harmoniq_backend.entity.chat.ChatMessage;
import dev.anirban.harmoniq_backend.entity.chat.Conversation;
import dev.anirban.harmoniq_backend.repo.ChatMessageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepo;

    // This function create all the messages in the conversation
    @Transactional
    public void create(Conversation conversation, List<Message> messages) {
        // Creating a new chat message list to store in the database
        List<ChatMessage> chatMessages = new ArrayList<>();

        // Adding all the messages to the list
        messages.forEach(message -> {
            ChatMessage chatMessage = ChatMessage
                    .builder()
                    .text(message.getText())
                    .messageType(message.getMessageType())
                    .createdAt(LocalDateTime.now())
                    .conversation(conversation)
                    .build();

            // Adding all the chat messages
            chatMessages.add(chatMessage);
        });

        // Saving all the messages in the database
        chatMessageRepo.saveAll(chatMessages);
    }

    // This function fetches all the chat messages with a given conversation id
    public Page<ChatMessage> fetchConversationChatHistory(String conversationId, Pageable pageable) {
        return chatMessageRepo.findByConversation_IdOrderByCreatedAtDesc(conversationId, pageable);
    }

    // This function returns all the chat messages with a given conversation id if the conversation is created by the user
    public Page<ChatMessage> fetchConversationChatHistory(
            String conversationId,
            UserDetails userDetails,
            Pageable pageable
    ) {
        return chatMessageRepo.findByConversation_IdAndConversation_CreatedBy_EmailOrderByCreatedAtDesc(
                conversationId, userDetails.getUsername(), pageable
        );
    }
}