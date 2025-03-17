package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThreadRepository extends JpaRepository<Thread, String> {

    // Finding threads created by a specific User
    List<Thread> findByCreatedBy_Email(String createdByEmail);
}