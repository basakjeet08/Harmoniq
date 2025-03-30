package dev.anirban.harmoniq_backend.dto.auth;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String id;
    private String name;
    private String email;
    private String avatar;
    private String role;
    private LocalDateTime createdAt;
    private String token;
    private String refreshToken;
}