package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.request.CommentRequest;
import dev.anirban.harmoniq_backend.dto.response.CommentDto;
import dev.anirban.harmoniq_backend.dto.response.ResponseWrapper;
import dev.anirban.harmoniq_backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;

    // This function handles the creation request for a Comment
    @PostMapping(UrlConstants.COMMENT_CREATE_ENDPOINT)
    public ResponseWrapper<CommentDto> handleCommentCreationRequest(
            @RequestBody CommentRequest commentRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        CommentDto comment = service.create(commentRequest, userDetails).toCommentDto();
        return new ResponseWrapper<>("Comment created Successfully !!", comment);
    }
}