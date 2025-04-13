package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Conversation;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface ConversationRepository extends JpaRepository<Conversation, String> {
    // Finding Conversations created by a specific User and in descending order of created at time
    Page<Conversation> findByCreatedBy_EmailOrderByCreatedAtDesc(String createdByEmail, Pageable pageable);

    @Transactional
    @Modifying
    int deleteByIdAndCreatedBy_Email(String id, String createdByEmail);
}