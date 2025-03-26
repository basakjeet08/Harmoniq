package dev.anirban.harmoniq_backend.dto.chat;

import dev.anirban.harmoniq_backend.dto.user.UserDto;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDto {
    private String id;
    private String title;
    private UserDto createdBy;
}