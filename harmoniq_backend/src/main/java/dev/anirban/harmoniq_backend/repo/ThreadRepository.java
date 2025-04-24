package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.threads.Thread;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ThreadRepository extends JpaRepository<Thread, String> {

    // Finding threads created by a specific User and in descending order of created at time
    Page<Thread> findByCreatedBy_EmailOrderByCreatedAtDesc(String createdByEmail, Pageable pageable);

    // Finding threads based on the tag names
    Page<Thread> findThreadByThreadTags_Tag_NameContainingIgnoreCaseOrderByCreatedAtDesc(String tagName, Pageable pageable);

    // This function fetches the user personalized threads
    @Query("""
            SELECT DISTINCT t FROM Thread t
            JOIN t.threadTags tt
            JOIN tt.tag tag
            JOIN tag.interests i
            WHERE i.user.email = :email
            ORDER BY t.totalComments DESC, t.totalLikes DESC
            """)
    Page<Thread> findUserInterestedPersonalizedThreads(String email, Pageable pageable);

    // This function fetches the threads ordered by their popularity (determined by comments , likes and creation time)
    @Query("SELECT t from Thread t ORDER BY t.totalComments DESC , t.totalComments DESC, t.createdAt DESC")
    Page<Thread> findThreadByPopularity(Pageable pageable);
}