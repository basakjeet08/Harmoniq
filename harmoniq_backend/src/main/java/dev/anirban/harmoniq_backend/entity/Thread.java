package dev.anirban.harmoniq_backend.entity;


import dev.anirban.harmoniq_backend.dto.thread.ThreadDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

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

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("createdAt DESC")
    private List<Comment> comments;

    public ThreadDto toThreadDto() {
        return ThreadDto
                .builder()
                .id(id)
                .description(description)
                .createdBy(createdBy.toUserDto())
                .build();
    }
}