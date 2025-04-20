package dev.anirban.harmoniq_backend.dto.thread;

import dev.anirban.harmoniq_backend.dto.comment.CommentDto;
import dev.anirban.harmoniq_backend.dto.user.UserDto;
import dev.anirban.harmoniq_backend.entity.threads.Comment;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
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
    private List<String> tags;
    private UserDto createdBy;
    private List<CommentDto> comments;
    private List<String> likedByUserIds;
    private Integer totalLikes;
    private Integer totalComments;

    public static ThreadDetailsResponse generateThreadDetailsResponse(Thread thread) {
        return ThreadDetailsResponse
                .builder()
                .id(thread.getId())
                .description(thread.getDescription())
                .tags(thread
                        .getThreadTags()
                        .stream()
                        .map(threadTag -> threadTag.getTag().getName())
                        .toList()
                )
                .createdBy(thread.getCreatedBy().toUserDto())
                .comments(thread
                        .getComments()
                        .stream()
                        .map(Comment::toCommentDto)
                        .toList()
                )
                .likedByUserIds(thread
                        .getLikes()
                        .stream()
                        .map(like -> like.getUser().getId())
                        .toList()
                )
                .totalLikes(thread.getTotalLikes())
                .totalComments(thread.getTotalComments())
                .build();
    }
}