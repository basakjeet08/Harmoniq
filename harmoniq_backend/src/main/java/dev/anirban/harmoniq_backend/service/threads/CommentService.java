package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.dto.comment.CommentRequest;
import dev.anirban.harmoniq_backend.entity.threads.Comment;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.repo.CommentRepository;
import dev.anirban.harmoniq_backend.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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
        // Fetching the user details
        User user = userService.findByEmail(userDetails.getUsername());

        // Fetching the thread by its id
        Thread thread = threadService.findById(threadId);

        // Updating the necessary data
        thread.incrementTotalCommentCount();
        interestService.addInterestsFromPostTags(thread.getThreadTags(), user);

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