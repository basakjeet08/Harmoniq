package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.thread.ThreadDetailsResponse;
import dev.anirban.harmoniq_backend.dto.thread.ThreadHistoryResponse;
import dev.anirban.harmoniq_backend.dto.thread.ThreadRequest;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.dto.thread.ThreadDto;
import dev.anirban.harmoniq_backend.entity.Thread;
import dev.anirban.harmoniq_backend.service.ThreadService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ThreadController {

    private final ThreadService service;

    // This function handles the thread creation requests
    @PostMapping(UrlConstants.CREATE_THREAD_ENDPOINT)
    public ResponseWrapper<ThreadDto> handleThreadCreationRequest(
            @RequestBody ThreadRequest threadRequest,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        ThreadDto thread = service.create(threadRequest, userDetails).toThreadDto();
        return new ResponseWrapper<>("Thread created Successfully !!", thread);
    }

    // This function handles the thread fetch all Requests
    @GetMapping(UrlConstants.FETCH_ALL_THREADS_ENDPOINT)
    public ResponseWrapper<List<ThreadDto>> handleThreadFindAllRequest() {
        List<ThreadDto> threadDtoList = service
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(Thread::toThreadDto)
                .toList();

        return new ResponseWrapper<>("Thread List fetched Successfully !!", threadDtoList);
    }

    // This function handles the thread find by ID Requests
    @GetMapping(UrlConstants.FETCH_BY_THREAD_ID_ENDPOINT)
    public ResponseWrapper<ThreadDetailsResponse> handleThreadFindByIdRequest(@PathVariable String id) {
        ThreadDetailsResponse threadDto = ThreadDetailsResponse.generateThreadDetailsResponse(service.findById(id));
        return new ResponseWrapper<>("Thread data fetched Successfully !!", threadDto);
    }

    // This function handles the thread fetch of the specified user requests
    @GetMapping(UrlConstants.FETCH_CURRENT_USER_THREADS_ENDPOINT)
    public ResponseWrapper<ThreadHistoryResponse> handleCurrentUserThreadsRequest(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<Thread> threadList = service.findByCreatedBy_Email(userDetails);
        ThreadHistoryResponse response = ThreadHistoryResponse.generateThreadHistoryResponse(threadList);
        return new ResponseWrapper<>("Thread history of the given user is successful !!", response);
    }

    // This function deleted the given thread
    @DeleteMapping(UrlConstants.DELETE_THREAD_BY_ID_ENDPOINT)
    public ResponseWrapper<Void> handleDeleteRequest(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        service.deleteById(id, userDetails);
        return new ResponseWrapper<>("Thread Deleted Successfully !!", null);
    }
}