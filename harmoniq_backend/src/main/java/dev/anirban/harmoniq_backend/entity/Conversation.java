package dev.anirban.harmoniq_backend.entity;

import dev.anirban.harmoniq_backend.dto.chat.ConversationDto;
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
@Table(name = "Conversation_DB")
public class Conversation {

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.LAZY
    )
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @OneToMany(
            cascade = CascadeType.ALL,
            mappedBy = "conversation",
            fetch = FetchType.LAZY,
            orphanRemoval = true
    )
    private List<ChatMessage> chatMessageList;

    public ConversationDto toConversationDto() {
        return ConversationDto
                .builder()
                .id(id)
                .title(title)
                .build();
    }
}