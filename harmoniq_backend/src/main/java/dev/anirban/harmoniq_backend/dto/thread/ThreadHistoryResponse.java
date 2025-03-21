package dev.anirban.harmoniq_backend.dto.thread;

import dev.anirban.harmoniq_backend.dto.user.UserDto;
import dev.anirban.harmoniq_backend.entity.Thread;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThreadHistoryResponse {
    private UserDto createdBy;
    private List<ThreadHistoryItem> threadList;

    public static ThreadHistoryResponse generateThreadHistoryResponse(List<Thread> threadList) {
        return ThreadHistoryResponse
                .builder()
                .createdBy(!threadList.isEmpty() ? threadList.getFirst().getCreatedBy().toUserDto() : null)
                .threadList(
                        !threadList.isEmpty() ? threadList
                                .stream()
                                .map(thread -> ThreadHistoryItem
                                        .builder()
                                        .id(thread.getId())
                                        .description(thread.getDescription())
                                        .build()
                                )
                                .toList() : null
                )
                .build();
    }
}

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
class ThreadHistoryItem {
    private String id;
    private String description;
}