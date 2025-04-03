package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, String> {
    Optional<Tag> findByName(String name);
}