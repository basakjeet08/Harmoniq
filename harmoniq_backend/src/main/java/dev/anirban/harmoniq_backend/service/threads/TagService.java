package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.entity.Tag;
import dev.anirban.harmoniq_backend.repo.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagService {

    // Injecting the required dependencies
    private final ChatClient tagChatClient;
    private final TagRepository tagRepo;

    // This function fetches all the tags from the database
    public List<Tag> fetchAllTags() {
        return tagRepo.findAll();
    }

    // This function fetches tags by their Name
    public List<Tag> findByNameContainingIgnoreCase(String name) {
        return tagRepo.findByNameContainingIgnoreCase(name);
    }

    // This function gets the chat model response for the thread prompt
    List<String> modelTagStringResponse(List<Tag> existingTags, String description) {

        // Converting the tags to a string for the Chat
        String allTags = existingTags
                .stream()
                .map(Tag::getName)
                .collect(Collectors.joining(", "));

        // Prompt to generate the tag
        String prompt = "Generate the 3 most relevant tags from these tags :" + allTags + " for the following thread description:" + description;

        // Generating the tags
        String response = tagChatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        return response != null && !response.isBlank()
                ? Arrays.stream(response.split(","))
                .map(String::trim)
                .filter(tag -> !tag.isEmpty())
                .limit(3)
                .toList()
                : Collections.emptyList();
    }

    // This function generate the tags for the threads
    @Transactional
    public List<Tag> generateTags(String description) {

        // Fetching all the old tags and generating the lookup table for later use
        List<Tag> existingTags = fetchAllTags();
        Map<String, Tag> tagLookupTable = existingTags
                .stream()
                .collect(Collectors.toMap(Tag::getName, tag -> tag));

        // Converting the tags to a string for the Chat
        List<String> modelResponse = modelTagStringResponse(existingTags, description);

        // Getting the new Tag List consisting of old tags and new tags
        return modelResponse
                .stream()
                .map(tagName -> tagLookupTable.getOrDefault(
                        tagName,
                        new Tag(null, tagName, new HashSet<>(), new HashSet<>())
                ))
                .toList();
    }

    // This function deletes the unused tags automatically
    @Scheduled(fixedRate = 86400000)
    @Transactional
    public void deleteUnusedTags() {
        List<Tag> unusedTags = fetchAllTags()
                .stream()
                .filter(tag -> tag.getThreads() == null || tag.getThreads().isEmpty())
                .toList();

        // When there are unused tags we delete it
        log.info("(|) - Checking for unused tags and found {} unused tags to delete !!", unusedTags.size());
        if (!unusedTags.isEmpty()) {
            tagRepo.deleteAll(unusedTags);
        }
    }
}