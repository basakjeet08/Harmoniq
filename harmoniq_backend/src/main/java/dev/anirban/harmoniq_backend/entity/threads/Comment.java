package dev.anirban.harmoniq_backend.entity.threads;

import dev.anirban.harmoniq_backend.dto.comment.CommentDto;
import dev.anirban.harmoniq_backend.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Comment_DB")
public class Comment {

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "thread_id", nullable = false)
    private Thread thread;

    public CommentDto toCommentDto() {
        return CommentDto
                .builder()
                .id(id)
                .content(content)
                .createdBy(createdBy.toUserDto())
                .build();
    }
}