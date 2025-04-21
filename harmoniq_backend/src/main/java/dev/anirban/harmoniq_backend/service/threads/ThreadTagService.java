package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.entity.threads.ThreadTag;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.exception.ThreadNotFound;
import dev.anirban.harmoniq_backend.repo.ThreadRepository;
import dev.anirban.harmoniq_backend.repo.ThreadTagRepository;
import dev.anirban.harmoniq_backend.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ThreadTagService {
    private final ThreadTagRepository threadTagRepo;
    private final TagService tagService;
    private final ThreadRepository threadRepo;
    private final UserService userService;

    // This function creates the thread tag object and store it in the database
    @Transactional
    @Async
    public void create(String threadId, String userEmail) {
        // Fetching the user and thread
        User user = userService.findByEmail(userEmail);
        Thread thread = threadRepo
                .findById(threadId)
                .orElseThrow(() -> new ThreadNotFound(threadId));

        // Generating the necessary tags
        List<Tag> tags = tagService.getRelevantTags(thread, user);

        // Creating a Thread Tag Object List
        List<ThreadTag> threadTagsList = tags
                .stream()
                .map(tag -> ThreadTag
                        .builder()
                        .thread(thread)
                        .tag(tag)
                        .build()
                )
                .toList();

        // Storing the thead tag objects
        threadTagRepo.saveAll(threadTagsList);
    }

    // This function returns the thread tag list which contains the given tags
    public List<ThreadTag> findByTags(List<Tag> tagNames) {
        return threadTagRepo.findByTagIn(tagNames);
    }
}