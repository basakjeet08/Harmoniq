package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.dto.tag.TagDto;
import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.service.threads.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TagController {

    // Injecting the required dependencies
    private final TagService service;

    @GetMapping(UrlConstants.FETCH_ALL_TAGS)
    public ResponseWrapper<List<TagDto>> handleFetchAllTagsRequest(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        List<TagDto> tagDtoPage = service
                .fetchAllTags()
                .stream()
                .map(Tag::toTagDto)
                .toList();

        return new ResponseWrapper<>("All Tags fetched successfully !!", tagDtoPage);
    }
}
