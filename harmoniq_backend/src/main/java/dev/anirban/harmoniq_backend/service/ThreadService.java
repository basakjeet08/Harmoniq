package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.thread.ThreadRequest;
import dev.anirban.harmoniq_backend.entity.Thread;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.ThreadNotFound;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.repo.ThreadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ThreadService {

    private final ThreadRepository threadRepo;
    private final UserService userService;

    // This function creates a new Thread and returns the created Thread
    public Thread create(ThreadRequest threadRequest, UserDetails userDetails) {
        // Fetching the user object from the database
        User user = userService
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFound(userDetails.getUsername()));

        // Creating a new Thread
        Thread thread = Thread
                .builder()
                .description(threadRequest.getDescription())
                .createdBy(user)
                .comments(new ArrayList<>())
                .build();

        return threadRepo.save(thread);
    }

    // This function searches the thread by its id
    public Thread findById(String id) {
        return threadRepo
                .findById(id)
                .orElseThrow(() -> new ThreadNotFound(id));
    }
}