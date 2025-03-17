package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.thread.ThreadRequest;
import dev.anirban.harmoniq_backend.entity.Thread;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.ThreadNotFound;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.repo.ThreadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    // This function fetches all the threads from the Database
    public List<Thread> findAll() {
        return threadRepo.findAll();
    }

    // This function fetches the threads which are created by the specified user
    public List<Thread> findByCreatedBy_Email(UserDetails userDetails) {
        return threadRepo.findByCreatedBy_Email(userDetails.getUsername());
    }

    // This function deletes all the threads from the database
    public void deleteById(String id, UserDetails userDetails) {
        // Checking if the thread is present
        Thread savedThread = findById(id);

        // Checking if the user is the creator of the thread
        if (!savedThread.getCreatedBy().getUsername().equals(userDetails.getUsername()))
            throw new UnAuthorized();

        threadRepo.deleteById(id);
    }
}