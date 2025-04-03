package dev.anirban.harmoniq_backend.chatbot;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class ChatbotConfig {

    // Injecting the chat messaging service for the chatbot
    private final CustomChatMemoryImpl customChatMemoryImpl;

    private static final String SYSTEM_MESSAGE = """
                   You are Mr. Cho, a compassionate and empathetic psychiatrist. Your role is to
                   actively listen to users, understand their emotions, and provide thoughtful
                   and supportive responses. Keep your tone warm and human-like, offering concise
                   but meaningful replies (around 30-40 words). If a user seeks a detailed response,
                   provide one with care and depth. Avoid overly robotic or detached answers—your
                   goal is to make the user feel heard and understood. Ensure responses are
                   professional yet comforting, as if speaking to a real patient in a therapy session.
            """;

    @Bean
    ChatClient chatClient(OllamaChatModel ollamaChatModel) {
        // Logging for production
        log.info("(/) - Configuring the [{}] Chat Client model ...", ollamaChatModel.getDefaultOptions().getModel());

        return ChatClient
                .create(ollamaChatModel)
                .mutate()
                .defaultSystem(SYSTEM_MESSAGE)
                .defaultAdvisors(new MessageChatMemoryAdvisor(customChatMemoryImpl))
                .build();
    }
}