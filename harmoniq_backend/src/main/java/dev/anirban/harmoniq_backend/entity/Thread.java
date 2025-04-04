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

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("createdAt DESC")
    private List<Comment> comments;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Like> likes;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "thread_tags",
            joinColumns = @JoinColumn(name = "thread_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    public void addTags(Tag tag) {
        if (!tags.contains(tag)) {
            tags.add(tag);
            tag.getThreads().add(this);
        }
    }

    public ThreadDto toThreadDto() {
        return ThreadDto
                .builder()
                .id(id)
                .description(description)
                .tags(tags
                        .stream()
                        .map(Tag::getName)
                        .toList()
                )
                .createdBy(createdBy.toUserDto())
                .build();
    }
}