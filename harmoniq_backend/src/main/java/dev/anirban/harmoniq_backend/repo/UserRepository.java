package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    List<User> findByRoleAndCreatedAtBefore(User.Type role, LocalDateTime createdAt);
}