package dev.anirban.harmoniq_backend.dto.tag;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {
    private String id;
    private String name;
}