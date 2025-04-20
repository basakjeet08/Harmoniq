package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.threads.ThreadTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThreadTagRepository extends JpaRepository<ThreadTag, String> {
    List<ThreadTag> findByTag_NameContainingIgnoreCase(String tagName);

    List<ThreadTag> findByTagIn(List<Tag> tags);
}