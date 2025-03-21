package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, String> {
}