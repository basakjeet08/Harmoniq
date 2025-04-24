package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
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

    // This function handles tag based thread fetching requests
    @GetMapping(UrlConstants.FETCH_THREADS_TYPE_TAG_ENDPOINT)
    public ResponseWrapper<Page<ThreadDto>> handleTagBasedThreadFetchRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String tagName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ThreadDto> threadDtoPage = service
                .findTagRelevantThreads(tagName, PageRequest.of(page, size))
                .map(Thread::toThreadDto);

        return new ResponseWrapper<>("Tag relevant threads fetched successfully !!", threadDtoPage);
    }

    // This function handles the personalised threads requests
    @GetMapping(UrlConstants.FETCH_THREADS_TYPE_PERSONALISE_ENDPOINT)
    public ResponseWrapper<Page<ThreadDto>> handlePersonalisedThreadFetchRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ThreadDto> threadDtoPage = service
                .findPersonalisedThreads(userDetails, PageRequest.of(page, size))
                .map(Thread::toThreadDto);

        return new ResponseWrapper<>("Personalised threads fetched successfully !!", threadDtoPage);
    }

    // This function handles the popular thread fetch requests
    @GetMapping(UrlConstants.FETCH_THREADS_TYPE_POPULAR_ENDPOINT)
    public ResponseWrapper<Page<ThreadDto>> handlePopularThreadFetchRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ThreadDto> threadDtoPage = service
                .findPopularThreads(PageRequest.of(page, size))
                .map(Thread::toThreadDto);

        return new ResponseWrapper<>("Popular threads fetched successfully !!", threadDtoPage);
    }

    // This function handle fetch the thread by id Requests
    @GetMapping(UrlConstants.FETCH_THREAD_BY_ID_ENDPOINT)
    public ResponseWrapper<ThreadDto> handleFindThreadByIdRequest(@PathVariable String id) {
        ThreadDto threadDto = service
                .findById(id)
                .toThreadDto();

        return new ResponseWrapper<>("Thread data fetched Successfully !!", threadDto);
    }

    // This function fetches the threads of the current user
    @GetMapping(UrlConstants.FETCH_CURRENT_USER_THREADS_ENDPOINT)
    public ResponseWrapper<Page<ThreadDto>> handleCurrentUserThreadsRequest(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ThreadDto> threadDtoPage = service
                .findByCreatedBy_Email(userDetails, PageRequest.of(page, size))
                .map(Thread::toThreadDto);

        return new ResponseWrapper<>("Thread history of the given user is successful !!", threadDtoPage);
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