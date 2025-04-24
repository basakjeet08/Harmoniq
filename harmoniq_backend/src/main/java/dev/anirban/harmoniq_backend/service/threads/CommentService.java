package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.dto.comment.CommentRequest;
import dev.anirban.harmoniq_backend.entity.threads.Comment;
import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.entity.threads.ThreadTag;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.repo.CommentRepository;
import dev.anirban.harmoniq_backend.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepo;
    private final UserService userService;
    private final ThreadService threadService;
    private final InterestService interestService;

    // This function creates a comment and returns the created comment
    @Transactional
    public Comment create(String threadId, CommentRequest commentRequest, UserDetails userDetails) {
        log.info("(|) - Received new comment creation request from {} for thread : {}", userDetails.getUsername(), threadId);

        // Fetching the user details
        User user = userService.findByEmail(userDetails.getUsername());

        // Fetching the thread by its id
        Thread thread = threadService.findById(threadId);

        // List of tags of this thread (Only 3 tags are there so it's fine)
        List<Tag> tags = thread
                .getThreadTags()
                .stream()
                .map(ThreadTag::getTag)
                .toList();

        // Updating the necessary data
        thread.incrementTotalCommentCount();
        interestService.markPositiveInterest(tags, user);

        // Creating the comment object
        Comment comment = Comment
                .builder()
                .content(commentRequest.getComment())
                .createdAt(LocalDateTime.now())
                .createdBy(user)
                .thread(thread)
                .build();

        return commentRepo.save(comment);
    }
}