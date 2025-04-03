package dev.anirban.harmoniq_backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagGenerationService {

    // Injecting the required dependencies
    private final ChatClient tagChatClient;

    // This function generate the tags for the threads
    public List<String> generateTags(String description) {
        String prompt = "Generate the 3 most relevant tags for the following thread description: " + description;

        String response = tagChatClient
                .prompt()
                .user(prompt)
                .call()
                .content();

        return response != null && !response.isBlank()
                ? Arrays.asList(response.split(","))
                : Collections.emptyList();
    }
}