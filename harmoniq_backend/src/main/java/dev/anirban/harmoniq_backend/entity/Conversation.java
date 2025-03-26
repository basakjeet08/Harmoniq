package dev.anirban.harmoniq_backend.entity;

import dev.anirban.harmoniq_backend.dto.chat.ConversationDto;
import dev.anirban.harmoniq_backend.dto.chat.ConversationHistoryDto;
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

    public ConversationDto toConversationDto() {
        return ConversationDto
                .builder()
                .id(id)
                .title(title)
                .createdBy(createdBy.toUserDto())
                .build();
    }

    public ConversationHistoryDto toConversationHistoryDto() {
        return ConversationHistoryDto
                .builder()
                .id(id)
                .title(title)
                .chatMessageList(chatMessageList
                        .stream()
                        .map(ChatMessage::toChatMessageDto)
                        .toList()
                )
                .build();
    }
}