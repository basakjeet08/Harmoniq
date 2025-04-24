package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.dto.thread.ThreadRequest;
import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.entity.threads.ThreadTag;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.exception.ThreadNotFound;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.repo.ThreadRepository;
import dev.anirban.harmoniq_backend.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ThreadService {

    private final ThreadRepository threadRepo;
    private final UserService userService;
    private final InterestService interestService;
    private final ThreadTagService threadTagService;

    // This function creates the thread and returns the created thread
    public Thread create(ThreadRequest threadRequest, UserDetails userDetails) {
        log.info("(|) - Received new thread creation request from {}", userDetails.getUsername());

        // Checking if the given request is valid or not
        if (threadRequest.getDescription() == null || threadRequest.getDescription().isBlank())
            throw new IllegalArgumentException("Thread description cannot be empty !!");

        // Fetching the user object from the database
        User user = userService.findByEmail(userDetails.getUsername());

        // Creating a new Thread object
        Thread thread = Thread
                .builder()
                .description(threadRequest.getDescription())
                .createdAt(LocalDateTime.now())
                .createdBy(user)
                .threadTags(new ArrayList<>())
                .comments(new ArrayList<>())
                .totalComments(0)
                .likes(new ArrayList<>())
                .totalLikes(0)
                .build();

        // saving the current thread before the Async Tasks
        Thread savedThread = threadRepo.save(thread);

        // Creating the thread tag object for mapping thread and tags
        threadTagService.create(savedThread.getId(), user.getEmail());

        // Returning the final Thread object from the database
        return savedThread;
    }

    // This function searches the thread by its id
    public Thread findById(String id) {
        return threadRepo
                .findById(id)
                .orElseThrow(() -> new ThreadNotFound(id));
    }

    // This function fetches the threads which are created by the specified user
    public List<Thread> findByCreatedBy_Email(UserDetails userDetails) {
        return threadRepo.findByCreatedBy_EmailOrderByCreatedAtDesc(userDetails.getUsername());
    }

    // This function fetches the threads by the tag name in descending order of created At
    public Page<Thread> findTagRelevantThreads(String tag, Pageable pageable) {
        return threadRepo.findThreadByThreadTags_Tag_NameContainingIgnoreCaseOrderByCreatedAtDesc(tag, pageable);
    }

    // This function fetches the threads which are created by the specified user
    public Page<Thread> findPersonalisedThreads(UserDetails userDetails, Pageable pageable) {
        return threadRepo.findUserInterestedPersonalizedThreads(userDetails.getUsername(), pageable);
    }

    // This function fetches the popular threads for exploring more threads
    public Page<Thread> findPopularThreads(Pageable pageable) {
        return threadRepo.findThreadByPopularity(pageable);
    }

    // This function deletes all the threads from the database
    @Transactional
    public void deleteById(String id, UserDetails userDetails) {
        log.info("(|) - Received new thread deletion request from {} for thread : {}", userDetails.getUsername(), id);

        // Fetching the user from the database
        User user = userService.findByEmail(userDetails.getUsername());

        // Checking if the thread is present
        Thread savedThread = findById(id);

        // Checking if the user is the creator of the thread
        if (!savedThread.getCreatedBy().getUsername().equals(user.getUsername()))
            throw new UnAuthorized();

        // fetching the thread tags list (Only 3 tags are there so this is fine)
        List<Tag> tags = savedThread
                .getThreadTags()
                .stream()
                .map(ThreadTag::getTag)
                .toList();

        // Decreasing the interests scores
        interestService.markNegativeInterest(tags, user);
        threadRepo.delete(savedThread);
    }
}