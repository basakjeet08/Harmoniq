package dev.anirban.harmoniq_backend.chatbot;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaApi;
import org.springframework.ai.ollama.api.OllamaModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatbotConfig {

    @Bean
    OllamaChatModel ollamaChatModel() {
        return OllamaChatModel
                .builder()
                .ollamaApi(new OllamaApi("http://localhost:11434"))
                .defaultOptions(
                        OllamaOptions
                                .builder()
                                .model(OllamaModel.MISTRAL)
                                .temperature(0.4)
                                .build()
                )
                .build();
    }

    @Bean
    ChatClient chatClient(OllamaChatModel ollamaChatModel) {
        return ChatClient.create(ollamaChatModel);
    }
}