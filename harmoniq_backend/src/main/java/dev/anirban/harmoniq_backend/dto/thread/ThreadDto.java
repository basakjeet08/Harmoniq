package dev.anirban.harmoniq_backend.dto.thread;

import dev.anirban.harmoniq_backend.dto.user.UserDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThreadDto {
    private String id;
    private String description;
    private UserDto createdBy;
    private List<String> tags;
    private Integer totalLikes;
    private List<String> likedByUserIds;
    private Integer totalComments;
}