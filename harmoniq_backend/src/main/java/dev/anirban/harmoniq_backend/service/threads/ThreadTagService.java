package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.entity.threads.ThreadTag;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.repo.ThreadTagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ThreadTagService {
    private final ThreadTagRepository threadTagRepo;
    private final TagService tagService;

    // This function creates the thread tag object and store it in the database
    @Transactional
    public void create(Thread thread, User user) {
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
}