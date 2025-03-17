package dev.anirban.harmoniq_backend.dto.comment;

import dev.anirban.harmoniq_backend.dto.user.UserDto;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private String id;
    private String content;
    private UserDto createdBy;
}