package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.comment.CommentRequest;
import dev.anirban.harmoniq_backend.dto.comment.CommentDto;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.service.threads.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}