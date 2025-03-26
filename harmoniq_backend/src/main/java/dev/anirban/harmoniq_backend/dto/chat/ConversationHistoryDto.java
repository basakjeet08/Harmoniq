package dev.anirban.harmoniq_backend.dto.chat;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationHistoryDto {
    private String id;
    private String title;
    private List<ChatMessageDto> chatMessageList;
}