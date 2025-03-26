package dev.anirban.harmoniq_backend.dto.chat;

import lombok.*;
import org.springframework.ai.chat.messages.MessageType;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private String id;
    private String text;
    private MessageType messageType;
    private LocalDateTime createdAt;
}