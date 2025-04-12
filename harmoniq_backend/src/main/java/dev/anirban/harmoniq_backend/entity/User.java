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
import java.util.Set;


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

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Thread> threads;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Like> likes;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Conversation> conversations;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("score DESC")
    private Set<Interest> interests;

    // Helper function to add threads
    public void addThread(Thread thread) {
        if (!threads.contains(thread)) {
            threads.add(thread);
            thread.setCreatedBy(this);
        }
    }

    // Helper function to add comments
    public void addComment(Comment comment) {
        if (!comments.contains(comment)) {
            comments.add(comment);
            comment.setCreatedBy(this);
        }
    }

    // Helper function to add likes
    public void addLikes(Like like) {
        if (!likes.contains(like)) {
            likes.add(like);
            like.setUser(this);
        }
    }

    // Helper function to add interest
    public void addInterest(Interest interest) {
        if (!interests.contains(interest)) {
            interests.add(interest);
            interest.setUser(this);
        }
    }

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