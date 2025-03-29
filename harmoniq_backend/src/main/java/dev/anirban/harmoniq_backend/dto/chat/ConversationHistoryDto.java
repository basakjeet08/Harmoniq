package dev.anirban.harmoniq_backend.dto.chat;

import dev.anirban.harmoniq_backend.dto.user.UserDto;
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
    private UserDto userDto;
    private String chatBotImage;
}