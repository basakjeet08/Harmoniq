package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {
    Page<ChatMessage> findByConversation_IdOrderByCreatedAtDesc(String conversationId, Pageable pageable);

    Page<ChatMessage> findByConversation_IdAndConversation_CreatedBy_EmailOrderByCreatedAtDesc(
            String id, String email, Pageable pageable
    );
}