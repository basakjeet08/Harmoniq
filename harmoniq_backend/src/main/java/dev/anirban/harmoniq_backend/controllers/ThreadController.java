package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.thread.ThreadRequest;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.dto.thread.ThreadDto;
import dev.anirban.harmoniq_backend.service.ThreadService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ThreadController {

    private final ThreadService service;

    // This function handles the thread creation requests
    @PostMapping(UrlConstants.THREAD_CREATE_ENDPOINT)
    public ResponseWrapper<ThreadDto> handleThreadCreationRequest(
            @RequestBody ThreadRequest threadRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        ThreadDto thread = service.create(threadRequest, userDetails).toThreadDto();
        return new ResponseWrapper<>("Thread created Successfully !!", thread);
    }
}