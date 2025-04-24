package dev.anirban.harmoniq_backend.entity.threads;

import dev.anirban.harmoniq_backend.dto.tag.TagDto;
import dev.anirban.harmoniq_backend.entity.user.Interest;
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
@Table(name = "Tag_DB")
public class Tag {

    @Id
    @UuidGenerator
    @Column(name = "id")
    private String id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ThreadTag> threadTags;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("score DESC")
    private List<Interest> interests;

    public TagDto toTagDto() {
        return TagDto
                .builder()
                .id(id)
                .name(name)
                .build();
    }
}