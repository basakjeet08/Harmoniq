package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepository extends JpaRepository<Thread, String> {
}