package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.chat.ConversationRequest;
import dev.anirban.harmoniq_backend.entity.ChatMessage;
import dev.anirban.harmoniq_backend.entity.Conversation;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.ConversationNotFound;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.repo.ConversationRepository;
import dev.anirban.harmoniq_backend.service.user.AvatarService;
import dev.anirban.harmoniq_backend.service.user.UserService;
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
    private final AvatarService avatarService;

    // This function creates a conversation room with the given ID
    public Conversation create(ConversationRequest conversationRequest, UserDetails userDetails) {
        // Fetching the user account
        User user = userService.findByEmail(userDetails.getUsername());

        // creating a new Conversation Object
        Conversation conversation = Conversation
                .builder()
                .title(conversationRequest.getTitle())
                .createdAt(LocalDateTime.now())
                .chatBotImage(avatarService.getChatbotAvatar())
                .chatMessageList(new ArrayList<>())
                .build();

        // Adding the conversation for relationship
        user.addConversation(conversation);

        return conversationRepo.save(conversation);
    }

    // This function gets the conversation with the given ID if present
    public Conversation findById(String id) {
        return conversationRepo
                .findById(id)
                .orElseThrow(() -> new ConversationNotFound(id));
    }

    // This function checks if the user can view the conversation before returning the conversation
    public Conversation findById(String id, UserDetails userDetails) {
        Conversation conversation = findById(id);

        // Checking if the user is valid or not
        if (!conversation.getCreatedBy().getUsername().equals(userDetails.getUsername()))
            throw new UnAuthorized();

        return conversation;
    }

    // This function fetches all the conversations for a particular user
    public List<Conversation> findByCreatedBy_EmailOrderByCreatedAtDesc(UserDetails userDetails) {
        return conversationRepo.findByCreatedBy_EmailOrderByCreatedAtDesc(userDetails.getUsername());
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
                    .build();

            savedConversation.addChatMessage(chatMessage);
        });

        conversationRepo.save(savedConversation);
    }

    // This function clears the conversation with the given id
    public void deleteById(String id) {
        conversationRepo.deleteById(id);
    }

    // This function clears the conversation after checking if the user is allowed to delete
    public void deleteById(String id, UserDetails userDetails) {
        Conversation conversation = findById(id);

        if (!conversation.getCreatedBy().getUsername().equals(userDetails.getUsername()))
            throw new UnAuthorized();
        else
            deleteById(id);
    }
}