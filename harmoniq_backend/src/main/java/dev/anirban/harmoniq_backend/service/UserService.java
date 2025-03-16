package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.request.AuthRequest;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    // This function creates a Moderator account
    public User createModerator(AuthRequest authRequest) {

        // Creating a user object
        User user = User
                .builder()
                .name("Random Anonymous Name")
                .email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword()))
                .role(User.Type.MODERATOR)
                .build();

        return userRepo.save(user);
    }

    // This function creates a Member account
    public User createMember(AuthRequest authRequest) {

        // Creating a user object
        User user = User
                .builder()
                .name("Random Anonymous Name")
                .email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword()))
                .role(User.Type.MEMBER)
                .build();

        return userRepo.save(user);
    }

    // This function fetches the user object with the given email
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}