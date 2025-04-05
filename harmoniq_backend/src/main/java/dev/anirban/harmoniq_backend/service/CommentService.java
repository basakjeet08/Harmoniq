package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.comment.CommentRequest;
import dev.anirban.harmoniq_backend.entity.Comment;
import dev.anirban.harmoniq_backend.entity.Thread;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.repo.CommentRepository;
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

    // This function creates a comment and returns the created comment
    public Comment create(String threadId, CommentRequest commentRequest, UserDetails userDetails) {
        // Fetching the user details
        User user = userService
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFound(userDetails.getUsername()));

        // Fetching the thread by its id
        Thread commentedThread = threadService.findById(threadId);

        // Creating the comment object
        Comment comment = Comment
                .builder()
                .content(commentRequest.getComment())
                .createdAt(LocalDateTime.now())
                .createdBy(user)
                .build();

        commentedThread.addComment(comment);

        return commentRepo.save(comment);
    }
}