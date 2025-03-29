package dev.anirban.harmoniq_backend.dto.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String id;
    private String name;
    private String email;
    private String avatar;
    private String role;
    private LocalDateTime createdAt;
}