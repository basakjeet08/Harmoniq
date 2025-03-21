package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.auth.AuthRequest;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    // This function creates a Member account
    public User create(AuthRequest authRequest) {

        // Creating a user object
        User user = User
                .builder()
                .name("Random Anonymous Name")
                .email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword()))
                .role(User.Type.MEMBER)
                .createdAt(LocalDateTime.now())
                .build();

        return userRepo.save(user);
    }

    // This function creates a Guest Account
    public User createGuest() {
        // Generate a unique Guest ID
        String guestId = "guest" + UUID.randomUUID().toString().substring(0, 8) + "@gmail.com";

        // Creating a user object
        User user = User
                .builder()
                .name("Guest User Random Name")
                .email(guestId)
                .password(encoder.encode("Guest Password"))
                .role(User.Type.GUEST)
                .createdAt(LocalDateTime.now())
                .build();

        return userRepo.save(user);
    }

    @Scheduled(fixedRate = 600000)
    public void deleteExpiredGuests() {
        LocalDateTime expiredTime = LocalDateTime.now().minusHours(1);

        // Find all the guest accounts which have expired
        List<User> expiredGuests = userRepo.findByRoleAndCreatedAtBefore(User.Type.GUEST, expiredTime);

        // When there are guest account which are expired
        if (!expiredGuests.isEmpty()) {
            System.out.println("(/) - Checking for expired Guests and deleted " + expiredGuests.size() + " guest accounts");
            userRepo.deleteAll(expiredGuests);
        }
    }

    // This function fetches the user object with the given email
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }
}