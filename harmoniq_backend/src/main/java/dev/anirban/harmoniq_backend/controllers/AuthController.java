package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.request.AuthRequest;
import dev.anirban.harmoniq_backend.dto.response.ResponseWrapper;
import dev.anirban.harmoniq_backend.dto.response.UserDto;
import dev.anirban.harmoniq_backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController {

    // This is the auth service which acts as a business logic layer for this controller
    private final AuthService service;

    // This function handles any register moderator request and returns the moderator object created
    @PostMapping(UrlConstants.REGISTER_MODERATOR_ENDPOINT)
    public ResponseWrapper<UserDto> handleModeratorRegisterRequest(@RequestBody AuthRequest authRequest) {
        UserDto admin = service.registerModerator(authRequest).toUserDto();
        return new ResponseWrapper<>("Moderator Created Successfully !!", admin);
    }

    // This function handles any register member request and returns the member created
    @PostMapping(UrlConstants.REGISTER_MEMBER_ENDPOINT)
    public ResponseWrapper<UserDto> handleMemberRegisterRequest(@RequestBody AuthRequest authRequest) {
        UserDto librarian = service.registerMember(authRequest).toUserDto();
        return new ResponseWrapper<>("Member Created Successfully !!", librarian);
    }

    // This function handles the login requests and returns the tokens
    @PostMapping(UrlConstants.LOGIN_ENDPOINT)
    public ResponseWrapper<UserDto> handleLoginRequest(@RequestBody AuthRequest authRequest) {
        UserDto userDto = service.loginUser(authRequest);
        return new ResponseWrapper<>("User Logged in Successfully !!", userDto);
    }

    // this function handles any register guest request and returns the member created
    @PostMapping(UrlConstants.LOGIN_AS_GUEST_ENDPOINT)
    public ResponseWrapper<UserDto> handleLoginAsGuestRequest() {
        UserDto userDto = service.loginAsGuest();
        return new ResponseWrapper<>("User Logged in as guest Successfully !!", userDto);
    }
}