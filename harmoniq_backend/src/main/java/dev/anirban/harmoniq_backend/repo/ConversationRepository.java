package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, String> {
}