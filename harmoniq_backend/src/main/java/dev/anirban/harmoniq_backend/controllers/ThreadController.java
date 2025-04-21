package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.thread.ThreadDetailsResponse;
import dev.anirban.harmoniq_backend.dto.thread.ThreadHistoryResponse;
import dev.anirban.harmoniq_backend.dto.thread.ThreadRequest;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.dto.thread.ThreadDto;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.service.threads.ThreadService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    public ResponseWrapper<ThreadDto> handleCreateThreadRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ThreadRequest threadRequest
    ) {
        ThreadDto thread = service.create(threadRequest, userDetails).toThreadDto();
        return new ResponseWrapper<>("Thread created Successfully !!", thread);
    }

    // This function handles requests to fetch all threads
    @GetMapping(UrlConstants.FETCH_ALL_THREADS_ENDPOINT)
    public ResponseWrapper<Page<ThreadDto>> handleFetchAllThreadsRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(name = "tag", required = false) String tag,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        // fetching the thread list
        Page<ThreadDto> threadDtoList = (
                tag != null && !tag.isEmpty()
                        ? service.findByTagNameContainingIgnoreCase(tag, PageRequest.of(page, size))
                        : service.findThreadsAccordingToInterests(userDetails, PageRequest.of(page, size))
        ).map(Thread::toThreadDto);

        return new ResponseWrapper<>("Thread List fetched Successfully !!", threadDtoList);
    }

    // This function handle fetch the thread by id Requests
    @GetMapping(UrlConstants.FETCH_THREAD_BY_ID_ENDPOINT)
    public ResponseWrapper<ThreadDetailsResponse> handleFindThreadByIdRequest(@PathVariable String id) {
        ThreadDetailsResponse threadDto = ThreadDetailsResponse.generateThreadDetailsResponse(service.findById(id));
        return new ResponseWrapper<>("Thread data fetched Successfully !!", threadDto);
    }

    // This function fetches the threads of the current user
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
    public ResponseWrapper<Void> handleDeleteThreadByIdRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String id
    ) {
        service.deleteById(id, userDetails);
        return new ResponseWrapper<>("Thread Deleted Successfully !!", null);
    }
}