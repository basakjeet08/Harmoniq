package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.entity.ChatMessage;
import dev.anirban.harmoniq_backend.entity.Conversation;
import dev.anirban.harmoniq_backend.repo.ConversationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.messages.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepo;

    // This function creates a conversation room with the given ID
    public Conversation create(String conversationId) {

        // creating a new Conversation Object
        Conversation conversation = Conversation
                .builder()
                .id(conversationId)
                .createdBy(null)
                .chatMessageList(new ArrayList<>())
                .build();

        return conversationRepo.save(conversation);
    }

    // This function adds the given Messages in the conversation
    @Transactional
    public void addMessages(String conversationId, List<Message> messages) {
        // Fetching the saved conversation or creating a new one
        Conversation savedConversation = findById(conversationId)
                .orElseGet(() -> create(conversationId));

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


    // This function gets the conversation with the given ID if present
    private Optional<Conversation> findById(String id) {
        return conversationRepo.findById(id);
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

    // This function fetches the conversation by the id and then returns all the Messages in it
    public List<Message> getAllMessagesOfConversation(String conversationId) {
        Optional<Conversation> conversation = findById(conversationId);

        return conversation
                .map(value -> value
                        .getChatMessageList()
                        .stream()
                        .map(this::parseChatMessage)
                        .toList()
                )
                .orElseGet(List::of);

    }

    // This function clears the conversation with the given id
    public void deleteById(String id) {
        conversationRepo.deleteById(id);
    }
}