package dev.anirban.harmoniq_backend.controllers;

import dev.anirban.harmoniq_backend.constants.UrlConstants;
import dev.anirban.harmoniq_backend.dto.auth.AuthRequest;
import dev.anirban.harmoniq_backend.dto.auth.AuthResponse;
import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
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
    public ResponseWrapper<AuthResponse> handleModeratorRegisterRequest(@RequestBody AuthRequest authRequest) {
        AuthResponse moderator = service.registerModerator(authRequest).toAuthResponse();
        return new ResponseWrapper<>("Moderator Created Successfully !!", moderator);
    }

    // This function handles any register member request and returns the member created
    @PostMapping(UrlConstants.REGISTER_MEMBER_ENDPOINT)
    public ResponseWrapper<AuthResponse> handleMemberRegisterRequest(@RequestBody AuthRequest authRequest) {
        AuthResponse member = service.registerMember(authRequest).toAuthResponse();
        return new ResponseWrapper<>("Member Created Successfully !!", member);
    }

    // This function handles the login requests and returns the tokens
    @PostMapping(UrlConstants.LOGIN_ENDPOINT)
    public ResponseWrapper<AuthResponse> handleLoginRequest(@RequestBody AuthRequest authRequest) {
        AuthResponse loggedUser = service.loginUser(authRequest);
        return new ResponseWrapper<>("User Logged in Successfully !!", loggedUser);
    }

    // this function handles any register guest request and returns the member created
    @PostMapping(UrlConstants.LOGIN_AS_GUEST_ENDPOINT)
    public ResponseWrapper<AuthResponse> handleLoginAsGuestRequest() {
        AuthResponse guestUser = service.loginAsGuest();
        return new ResponseWrapper<>("User Logged in as guest Successfully !!", guestUser);
    }
}