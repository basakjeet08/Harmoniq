package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.entity.threads.ThreadTag;
import dev.anirban.harmoniq_backend.repo.ThreadTagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ThreadTagService {
    private final ThreadTagRepository threadTagRepo;

    @Transactional
    public List<ThreadTag> createAll(List<Tag> tags, Thread thread) {
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

        return threadTagRepo.saveAll(threadTagsList);
    }
}