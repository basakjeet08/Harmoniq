package dev.anirban.harmoniq_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Conversation_DB")
public class Conversation {

    @Id
//    @UuidGenerator
    @Column(name = "id")
    private String id;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "conversation",
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    @OrderBy("createdAt ASC")
    private List<ChatMessage> chatMessageList;
}