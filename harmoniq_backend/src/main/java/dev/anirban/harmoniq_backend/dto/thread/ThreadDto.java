package dev.anirban.harmoniq_backend.dto.thread;

import dev.anirban.harmoniq_backend.dto.response.UserDto;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThreadDto {
    private String id;
    private String description;
    private UserDto createdBy;
}