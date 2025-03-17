package dev.anirban.harmoniq_backend.dto.thread;

import dev.anirban.harmoniq_backend.dto.comment.CommentDto;
import dev.anirban.harmoniq_backend.dto.user.UserDto;
import dev.anirban.harmoniq_backend.entity.Comment;
import dev.anirban.harmoniq_backend.entity.Thread;
import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThreadDetailsResponse {
    private String id;
    private String description;
    private UserDto createdBy;
    private List<CommentDto> comments;

    public static ThreadDetailsResponse generateThreadDetailsResponse(Thread thread) {
        return ThreadDetailsResponse
                .builder()
                .id(thread.getId())
                .description(thread.getDescription())
                .createdBy(thread.getCreatedBy().toUserDto())
                .comments(
                        thread
                                .getComments()
                                .stream()
                                .map(Comment::toCommentDto)
                                .toList()
                )
                .build();
    }
}