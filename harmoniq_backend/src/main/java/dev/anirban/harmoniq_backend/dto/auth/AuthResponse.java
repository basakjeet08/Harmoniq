package dev.anirban.harmoniq_backend.dto.auth;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String id;
    private String name;
    private String email;
    private String role;
    private String token;
    private String refreshToken;
}