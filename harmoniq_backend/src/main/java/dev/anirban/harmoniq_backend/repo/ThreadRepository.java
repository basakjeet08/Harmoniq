package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.threads.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThreadRepository extends JpaRepository<Thread, String> {

    // Finding threads created by a specific User and in descending order of created at time
    List<Thread> findByCreatedBy_EmailOrderByCreatedAtDesc(String createdByEmail);

    // Finding all the threads which are not given in that set
    List<Thread> findAllByIdNotInOrderByCreatedAtDesc(List<String> threadIds);

    // Finding threads based on the tag names
    List<Thread> findThreadByThreadTags_Tag_NameContainingIgnoreCaseOrderByCreatedAtDesc(String tagName);
}