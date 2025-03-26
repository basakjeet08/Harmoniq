package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, String> {
    // Finding Conversations created by a specific User and in descending order of created at time
    List<Conversation> findByCreatedBy_EmailOrderByCreatedAtDesc(String createdByEmail);
}