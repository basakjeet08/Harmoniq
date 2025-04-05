package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LikeController {

    // Injecting the needed services
    private final LikeService service;

    // This function handles the incoming toggle like requests
    @PostMapping(UrlConstants.TOGGLE_LIKE_ENDPOINT)
    public ResponseWrapper<Void> handleToggleLikeRequest(
            @PathVariable(name = "threadId") String threadId,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        service.toggleLike(userDetails, threadId);
        return new ResponseWrapper<>("Like toggled successfully !!", null);
    }
}