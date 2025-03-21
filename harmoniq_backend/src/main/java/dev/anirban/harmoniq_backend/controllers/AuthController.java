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

    // This function handles register request
    @PostMapping(UrlConstants.REGISTER_ENDPOINT)
    public ResponseWrapper<AuthResponse> handleRegisterRequest(@RequestBody AuthRequest authRequest) {
        AuthResponse member = service.register(authRequest).toAuthResponse();
        return new ResponseWrapper<>("Member Created Successfully !!", member);
    }

    // This function handles the login requests and returns the tokens
    @PostMapping(UrlConstants.LOGIN_ENDPOINT)
    public ResponseWrapper<AuthResponse> handleLoginRequest(@RequestBody AuthRequest authRequest) {
        AuthResponse loggedUser = service.loginUser(authRequest);
        return new ResponseWrapper<>("User Logged in Successfully !!", loggedUser);
    }

    // this function registers guest user and returns the guest account created with tokens
    @PostMapping(UrlConstants.LOGIN_AS_GUEST_ENDPOINT)
    public ResponseWrapper<AuthResponse> handleLoginAsGuestRequest() {
        AuthResponse guestUser = service.loginAsGuest();
        return new ResponseWrapper<>("User Logged in as guest Successfully !!", guestUser);
    }
}