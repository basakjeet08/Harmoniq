package dev.anirban.harmoniq_backend.entity.threads;


import dev.anirban.harmoniq_backend.dto.thread.ThreadDto;
import dev.anirban.harmoniq_backend.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Thread_DB")
public class Thread {

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ThreadTag> threadTags;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("createdAt DESC")
    private List<Comment> comments;

    @Column(name = "total_comments", nullable = false)
    private Integer totalComments;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Like> likes;

    @Column(name = "total_likes", nullable = false)
    private Integer totalLikes;

    // This function adds the comments to the thread
    public void incrementTotalCommentCount() {
        totalComments++;
    }

    // This function deletes the comment from the thread
    public void decrementTotalCommentCount() {
        if (totalComments > 0)
            totalComments--;
    }

    // This function adds the likes to the thread
    public void incrementTotalLikesCount() {
        totalLikes++;
    }

    // This function removes likes from the thread
    public void decrementTotalLikesCount() {
        if (totalLikes > 0)
            totalLikes--;
    }

    public ThreadDto toThreadDto() {
        return ThreadDto
                .builder()
                .id(id)
                .description(description)
                .tags(threadTags
                        .stream()
                        .map(threadTag -> threadTag.getTag().getName())
                        .toList()
                )
                .createdBy(createdBy.toUserDto())
                .totalLikes(totalLikes)
                .likedByUserIds(likes.stream().map(like -> like.getUser().getId()).toList())
                .totalComments(totalComments)
                .build();
    }
}