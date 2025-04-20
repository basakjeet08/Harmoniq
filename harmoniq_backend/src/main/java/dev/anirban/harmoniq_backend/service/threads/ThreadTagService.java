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

    // This function returns the list of ThreadTag entries which has a similar name like our given tag name
    public List<ThreadTag> findByTagNameContaining(String tagName) {
        return threadTagRepo.findByTag_NameContainingIgnoreCase(tagName);
    }

    // This function returns the thread tag list which contains the given tags
    public List<ThreadTag> findByTags(List<Tag> tagNames) {
        return threadTagRepo.findByTagIn(tagNames);
    }
}