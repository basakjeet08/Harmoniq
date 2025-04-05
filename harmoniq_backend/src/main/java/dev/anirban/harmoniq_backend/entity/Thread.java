package dev.anirban.harmoniq_backend.entity;


import dev.anirban.harmoniq_backend.dto.thread.ThreadDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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

    @ManyToMany(cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "thread_tags",
            joinColumns = @JoinColumn(name = "thread_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("createdAt DESC")
    private List<Comment> comments;

    @Column(name = "total_comments", nullable = false)
    private Integer totalComments;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Like> likes;

    @Column(name = "total_likes", nullable = false)
    private Integer totalLikes;

    // This function add the tags to the thread
    public void addTags(Tag tag) {
        if (!tags.contains(tag)) {
            tags.add(tag);
            tag.getThreads().add(this);
        }
    }

    // This function adds the comments to the thread
    public void addComment(Comment comment) {
        if (!comments.contains(comment)) {
            comments.add(comment);
            comment.setThread(this);
            totalComments++;
        }
    }

    // This function deletes the comment from the thread
    public void removeComment(Comment comment) {
        if (comments.contains(comment)) {
            comments.remove(comment);
            comment.setThread(null);
            totalComments--;
        }
    }

    // This function adds the likes to the thread
    public void addLikes(Like like) {
        if (!likes.contains(like)) {
            likes.add(like);
            like.setThread(this);
            totalLikes++;
        }
    }

    // This function removes likes from the thread
    public void removeLike(Like like) {
        if (likes.contains(like)) {
            likes.remove(like);
            like.setThread(null);
            totalLikes--;
        }
    }

    public ThreadDto toThreadDto() {
        return ThreadDto
                .builder()
                .id(id)
                .description(description)
                .tags(tags.stream().map(Tag::getName).toList())
                .createdBy(createdBy.toUserDto())
                .totalLikes(totalLikes)
                .likedByUserIds(likes.stream().map(like -> like.getUser().getId()).toList())
                .totalComments(totalComments)
                .build();
    }
}