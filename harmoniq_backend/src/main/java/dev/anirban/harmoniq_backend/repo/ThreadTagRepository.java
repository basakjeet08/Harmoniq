package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.threads.ThreadTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadTagRepository extends JpaRepository<ThreadTag, String> {
}