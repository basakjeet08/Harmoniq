package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.dto.thread.ThreadRequest;
import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.exception.ThreadNotFound;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.repo.ThreadRepository;
import dev.anirban.harmoniq_backend.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ThreadService {

    private final ThreadRepository threadRepo;
    private final UserService userService;
    private final TagService tagService;
    private final InterestService interestService;

    // This function creates a new Thread and returns the created Thread
    @Transactional
    public Thread create(ThreadRequest threadRequest, UserDetails userDetails) {
        // Fetching the user object from the database
        User user = userService.findByEmail(userDetails.getUsername());

        // Fetching the generated final tag List from the tag service
        List<Tag> tagList = tagService.generateTags(threadRequest.getDescription());

        // Creating a new Thread
        Thread thread = Thread
                .builder()
                .description(threadRequest.getDescription())
                .createdAt(LocalDateTime.now())
                .createdBy(user)
                .tags(new ArrayList<>())
                .comments(new ArrayList<>())
                .totalComments(0)
                .likes(new HashSet<>())
                .totalLikes(0)
                .build();

        // Saving the tags and threads for Bi - Directional relationship
        for (Tag tag : tagList)
            thread.addTags(tag);

        // Updating the user interests
        interestService.addInterestsFromPostTags(thread.getTags(), user);

        return threadRepo.save(thread);
    }

    // This function fetches all the threads from the Database
    public List<Thread> findAllByOrderByCreatedAtDesc() {
        return threadRepo.findAllByOrderByCreatedAtDesc();
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

    // This function fetches the threads which are created by the specified user
    @Transactional
    public List<Thread> findThreadsAccordingToInterests(UserDetails userDetails) {
        // Fetching the user from the database
        User user = userService.findByEmail(userDetails.getUsername());

        // Returning the user thread list which matches the user interests
        List<Thread> personalizedThreads = user
                .getInterests()
                .stream()
                .limit(3)
                .flatMap(interest -> interest.getTag().getThreads().stream())
                .distinct()
                .sorted(Comparator.comparing(Thread::getCreatedAt).reversed())
                .toList();

        // Creating a HashSet for quick searching and lookup
        Set<Thread> personalizedSet = new HashSet<>(personalizedThreads);

        // Finding the top exploratory threads and making sure we don't have the same thread multiple times
        List<Thread> exploratoryThreads = findAllByOrderByCreatedAtDesc()
                .stream()
                .filter(thread -> !personalizedSet.contains(thread)) // O(1) Complexity for Hashset
                .limit(10)
                .toList();

        // Merging both the lists and returning
        ArrayList<Thread> finalFeed = new ArrayList<>(personalizedThreads);
        finalFeed.addAll(exploratoryThreads);
        return finalFeed;
    }

    // This function fetches the threads by the tag name in descending order of created At
    public List<Thread> findByNameContainingIgnoreCase(String tag) {
        return tagService
                .findByNameContainingIgnoreCase(tag)
                .stream()
                .flatMap(t -> t.getThreads().stream())
                .distinct()
                .sorted(Comparator.comparing(Thread::getCreatedAt).reversed())
                .toList();
    }

    // This function deletes all the threads from the database
    @Transactional
    public void deleteById(String id, UserDetails userDetails) {
        // Fetching the user from the database
        User user = userService.findByEmail(userDetails.getUsername());

        // Checking if the thread is present
        Thread savedThread = findById(id);

        // Checking if the user is the creator of the thread
        if (!savedThread.getCreatedBy().getUsername().equals(user.getUsername()))
            throw new UnAuthorized();

        // Decreasing the interests scores
        interestService.removeInterestFromPostTags(savedThread.getTags(), user);
        threadRepo.delete(savedThread);
    }
}