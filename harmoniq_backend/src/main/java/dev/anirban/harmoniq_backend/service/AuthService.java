package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.request.AuthRequest;
import dev.anirban.harmoniq_backend.dto.response.UserDto;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.EmailAlreadyExists;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthService {

    // Injecting the necessary service dependencies
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    // This function registers moderator
    public User registerModerator(AuthRequest authRequest) {
        if (userService.findByEmail(authRequest.getEmail()).isPresent())
            throw new EmailAlreadyExists(authRequest.getEmail());

        return userService.createModerator(authRequest);
    }

    // This function registers a Member
    public User registerMember(AuthRequest authRequest) {
        if (userService.findByEmail(authRequest.getEmail()).isPresent())
            throw new EmailAlreadyExists(authRequest.getEmail());

        return userService.createMember(authRequest);
    }

    // This function generates the token wrapper for the user
    private String[] generateTokenWrapper(UserDetails user) {
        String token = jwtService.generateToken(user, new Date(System.currentTimeMillis() + 1000 * 60 * 60));
        String refreshToken = jwtService.generateToken(user, new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24));

        return new String[]{token, refreshToken};
    }

    // This function logs in the user and returns the tokens for his subsequent requests
    public UserDto loginUser(AuthRequest authRequest) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getEmail(),
                        authRequest.getPassword()
                )
        );

        // Fetching the user Details Object and creating the token wrapper and user Dto
        User userDetails = userService
                .findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new UserNotFound(authRequest.getEmail()));

        String[] tokens = generateTokenWrapper(userDetails);
        UserDto user = userDetails.toUserDto();

        // Setting the token in the user dto
        user.setToken(tokens[0]);
        user.setRefreshToken(tokens[1]);

        return user;
    }

    // This function registers a Guest Account
    public UserDto loginAsGuest() {
        // Creating a Guest User
        User user = userService.createGuest();

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        "Guest Password"
                )
        );

        // Generating the tokens
        String[] tokens = generateTokenWrapper(user);
        UserDto userDto = user.toUserDto();

        // Setting the tokens in the user dto
        userDto.setToken(tokens[0]);
        userDto.setRefreshToken(tokens[1]);

        return userDto;
    }
}