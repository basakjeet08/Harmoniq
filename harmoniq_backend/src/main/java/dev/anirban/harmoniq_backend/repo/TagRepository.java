package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, String> {
    List<Tag> findByNameContainingIgnoreCase(String name);
}