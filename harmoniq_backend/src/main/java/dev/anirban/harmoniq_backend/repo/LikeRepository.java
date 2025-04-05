package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Like;
import dev.anirban.harmoniq_backend.entity.Thread;
import dev.anirban.harmoniq_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, String> {
    Optional<Like> findByUserAndThread(User user, Thread thread);
}