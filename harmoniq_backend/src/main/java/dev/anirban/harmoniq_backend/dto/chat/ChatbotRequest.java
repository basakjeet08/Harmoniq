package dev.anirban.harmoniq_backend.dto.chat;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatbotRequest {
    private String prompt;
}