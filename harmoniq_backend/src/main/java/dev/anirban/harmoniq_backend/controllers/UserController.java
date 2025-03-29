package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // This function returns all the avatars for user
    @GetMapping(UrlConstants.USER_AVATAR_FETCH_ALL_ENDPOINT)
    public ResponseWrapper<List<String>> handleAvatarRequest() {
        return new ResponseWrapper<>("Avatars fetched successfully !!", userService.getAllAvatars());
    }
}