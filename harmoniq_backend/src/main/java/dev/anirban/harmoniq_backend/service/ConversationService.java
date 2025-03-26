package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.entity.ChatMessage;
import dev.anirban.harmoniq_backend.entity.Conversation;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.ConversationNotFound;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.repo.ConversationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepo;
    private final UserService userService;

    // This function creates a conversation room with the given ID
    public Conversation create(UserDetails userDetails) {
        // Fetching the user account
        User user = userService
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFound(userDetails.getUsername()));

        // creating a new Conversation Object
        Conversation conversation = Conversation
                .builder()
                .createdBy(user)
                .chatMessageList(new ArrayList<>())
                .build();

        return conversationRepo.save(conversation);
    }

    // This function gets the conversation with the given ID if present
    public Conversation findById(String id) {
        return conversationRepo
                .findById(id)
                .orElseThrow(() -> new ConversationNotFound(id));
    }

    // This function adds the given Messages in the conversation
    @Transactional
    public void addMessages(String conversationId, List<Message> messages) {
        // Fetching the saved conversation or creating a new one
        Conversation savedConversation = findById(conversationId);

        // Adding the messages in the conversation
        messages.forEach(message -> {
            ChatMessage chatMessage = ChatMessage
                    .builder()
                    .text(message.getText())
                    .messageType(message.getMessageType())
                    .createdAt(LocalDateTime.now())
                    .conversation(savedConversation)
                    .build();

            savedConversation.getChatMessageList().add(chatMessage);
        });

        conversationRepo.save(savedConversation);
    }

    // This function clears the conversation with the given id
    public void deleteById(String id) {
        conversationRepo.deleteById(id);
    }
}