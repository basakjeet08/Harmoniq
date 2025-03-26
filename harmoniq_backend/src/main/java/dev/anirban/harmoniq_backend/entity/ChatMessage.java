package dev.anirban.harmoniq_backend.entity;

import dev.anirban.harmoniq_backend.dto.chat.ChatMessageDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.MessageType;

import java.time.LocalDateTime;
import java.util.Map;


@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Chat_Message_DB")
public class ChatMessage implements Message {

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "text", nullable = false, columnDefinition = "TEXT")
    private String text;

    @Column(name = "message_type", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private MessageType messageType;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(
            cascade = {CascadeType.REFRESH, CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST},
            fetch = FetchType.EAGER
    )
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @Override
    public Map<String, Object> getMetadata() {
        return Map.of();
    }

    public ChatMessageDto toChatMessageDto() {
        return ChatMessageDto
                .builder()
                .id(id)
                .text(text)
                .messageType(messageType)
                .createdAt(createdAt)
                .build();
    }
}