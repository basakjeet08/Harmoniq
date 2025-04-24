package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.comment.CommentRequest;
import dev.anirban.harmoniq_backend.dto.comment.CommentDto;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.entity.threads.Comment;
import dev.anirban.harmoniq_backend.service.threads.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    // This function handles the creation request for a Comment
    @PostMapping(UrlConstants.CREATE_COMMENT_ENDPOINT)
    public ResponseWrapper<CommentDto> handleCreateCommentRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("threadId") String threadId,
            @RequestBody CommentRequest commentRequest
    ) {
        CommentDto comment = service.create(threadId, commentRequest, userDetails).toCommentDto();
        return new ResponseWrapper<>("Comment created Successfully !!", comment);
    }

    // This function fetches the comments for a given thread
    @GetMapping(UrlConstants.FETCH_ALL_COMMENTS_FOR_THREAD_ENDPOINT)
    public ResponseWrapper<Page<CommentDto>> handleCommentFetchByThreadIdRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("id") String id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<CommentDto> commentDtoPage = service
                .fetchCommentForThread(id, PageRequest.of(page, size))
                .map(Comment::toCommentDto);

        return new ResponseWrapper<>("All Comments of the thread are fetched successfully", commentDtoPage);
    }
}