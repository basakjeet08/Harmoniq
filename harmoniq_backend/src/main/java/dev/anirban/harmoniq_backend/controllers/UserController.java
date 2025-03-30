package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import dev.anirban.harmoniq_backend.dto.user.UserDto;
import dev.anirban.harmoniq_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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

    // This function returns the user with the given it
    @GetMapping(UrlConstants.FETCH_USER_BY_ID_ENDPOINT)
    public ResponseWrapper<UserDto> handleFetchUserByIdRequest(@PathVariable String id) {
        UserDto userDto = userService.findById(id).toUserDto();
        return new ResponseWrapper<>("User details fetched successfully !!", userDto);
    }

    // This function handles user update requests
    @PatchMapping(UrlConstants.UPDATE_USER_ENDPOINT)
    public ResponseWrapper<UserDto> handleUpdateUserRequest(
            @RequestBody UserDto requestUser,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        UserDto userDto = userService.update(requestUser, userDetails).toUserDto();
        return new ResponseWrapper<>("User updated successfully !!", userDto);
    }

    // This function handles the requests to delete the user
    @DeleteMapping(UrlConstants.DELETE_USER_ENDPOINT)
    public ResponseWrapper<Void> handleDeleteUserRequest(@AuthenticationPrincipal UserDetails userDetails) {
        userService.delete(userDetails);
        return new ResponseWrapper<>("User deleted successfully !!", null);
    }
}