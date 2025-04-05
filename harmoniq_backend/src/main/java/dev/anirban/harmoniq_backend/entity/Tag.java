package dev.anirban.harmoniq_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.Set;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Tag_DB")
public class Tag {

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @ManyToMany(
            mappedBy = "tags",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST}
    )
    private Set<Thread> threads;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Interest> interests;

    // Helper function to add interest
    public void addInterest(Interest interest) {
        if (!interests.contains(interest)) {
            interests.add(interest);
            interest.setTag(this);
        }
    }
}