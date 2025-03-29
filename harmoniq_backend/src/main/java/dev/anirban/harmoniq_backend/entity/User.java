package dev.anirban.harmoniq_backend.entity;

import dev.anirban.harmoniq_backend.dto.auth.AuthResponse;
import dev.anirban.harmoniq_backend.dto.user.UserDto;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;


@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "User_DB")
public class User implements UserDetails {

    public enum Type {
        MODERATOR, MEMBER, GUEST
    }

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "avatar", nullable = false)
    private String avatar;

    @Column(name = "role", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Type role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public AuthResponse toAuthResponse() {
        return AuthResponse
                .builder()
                .id(id)
                .name(name)
                .email(email)
                .avatar(avatar)
                .role(role.toString())
                .createdAt(createdAt)
                .build();
    }

    public UserDto toUserDto() {
        return UserDto
                .builder()
                .id(id)
                .name(name)
                .email(email)
                .avatar(avatar)
                .role(role.toString())
                .createdAt(createdAt)
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.toString()));
    }

    @Override
    public String getUsername() {
        return email;
    }
}