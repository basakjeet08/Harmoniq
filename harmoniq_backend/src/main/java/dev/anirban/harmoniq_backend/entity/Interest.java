package dev.anirban.harmoniq_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Interest_DB")
public class Interest {

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "last_visited", nullable = false)
    private LocalDateTime lastVisited;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    // Helper function to increase the score of this interest
    public void increaseScore() {
        score++;
        lastVisited = LocalDateTime.now();
    }

    // Helper function to decrease the score of this interest
    public void decreaseScore() {
        if (score > 0)
            score--;
    }
}