package dev.anirban.harmoniq_backend.dto.response;

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