package dev.anirban.harmoniq_backend.service.chat;

import dev.anirban.harmoniq_backend.dto.chat.ConversationRequest;
import dev.anirban.harmoniq_backend.entity.chat.Conversation;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.exception.ConversationNotFound;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.repo.ConversationRepository;
import dev.anirban.harmoniq_backend.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.messages.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class ConversationService {

    // Injecting all the required dependencies
    private final ConversationRepository conversationRepo;
    private final UserService userService;
    private final ChatMessageService chatMessageService;

    // This function creates a conversation room with the given ID
    public Conversation create(ConversationRequest conversationRequest, UserDetails userDetails) {
        log.info("(|) - Received new conversation creation request from {}", userDetails.getUsername());

        // checking if the title and everything is provided
        if (conversationRequest.getTitle() == null || conversationRequest.getTitle().isEmpty())
            throw new IllegalArgumentException("Conversation title is required !!");

        // Fetching the user account
        User user = userService.findByEmail(userDetails.getUsername());

        // creating a new Conversation Object
        Conversation conversation = Conversation
                .builder()
                .title(conversationRequest.getTitle())
                .createdAt(LocalDateTime.now())
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

    // This function fetches all the conversations for a particular user
    public Page<Conversation> fetchUserConversationHistory(UserDetails userDetails, Pageable pageable) {
        return conversationRepo.findByCreatedBy_EmailOrderByCreatedAtDesc(userDetails.getUsername(), pageable);
    }

    // This function adds the given Messages in the conversation
    @Transactional
    public void addMessages(String conversationId, List<Message> messages) {
        // Fetching the saved conversation or creating a new one
        Conversation savedConversation = findById(conversationId);
        chatMessageService.create(savedConversation, messages);
    }

    // This function clears the conversation with the given id
    public void deleteById(String id) {
        conversationRepo.deleteById(id);
    }

    // This function clears the conversation after checking if the user is allowed to delete
    public void deleteById(String id, UserDetails userDetails) {
        int rowsDeleted = conversationRepo.deleteByIdAndCreatedBy_Email(id, userDetails.getUsername());

        if (rowsDeleted != 1)
            throw new UnAuthorized();
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void deleteExpiredGuests() {
        LocalDateTime expiredTime = LocalDateTime.now().minusDays(14);

        // Find all the guest accounts which have expired
        int rows = conversationRepo.deleteAllByCreatedAtBefore(expiredTime);
        log.info("(|) - Checking for expired conversations and deleted {} conversations", rows);
    }
}