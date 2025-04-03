package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.dto.auth.AuthRequest;
import dev.anirban.harmoniq_backend.dto.user.UserDto;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final RandomNameService randomNameService;
    private final AvatarService avatarService;

    // This function creates a Member account
    public User create(AuthRequest authRequest) {

        // Creating a user object
        User user = User
                .builder()
                .name(randomNameService.generateRandomName())
                .email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword()))
                .role(User.Type.MEMBER)
                .avatar(authRequest.getAvatar())
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
                .name(randomNameService.generateRandomName())
                .email(guestId)
                .password(encoder.encode("Guest Password"))
                .role(User.Type.GUEST)
                .avatar(avatarService.generateAvatar())
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
            log.info("(|) - Checking for expired guests accounts and deleted {} guest accounts", expiredGuests.size());
            userRepo.deleteAll(expiredGuests);
        }
    }

    // This function returns the list of avatars to the user
    public List<String> getAllAvatars() {
        return avatarService.getAllAvatars();
    }

    // This function fetches the user object with the given email
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    // This function fetches the user details by ID
    public User findById(String id) {
        return userRepo
                .findById(id)
                .orElseThrow(() -> new UserNotFound(id));
    }

    // This function updates the user data
    public User update(UserDto userDto, UserDetails userDetails) {
        User savedUser = findById(userDto.getId());

        if (!userDetails.getUsername().equals(savedUser.getUsername()))
            throw new UnAuthorized();

        if (userDto.getName() != null)
            savedUser.setName(userDto.getName());

        if (userDto.getEmail() != null)
            savedUser.setEmail(userDto.getEmail());

        if (userDto.getPassword() != null)
            savedUser.setPassword(encoder.encode(userDto.getPassword()));

        if (userDto.getAvatar() != null)
            savedUser.setAvatar(userDto.getAvatar());

        return userRepo.save(savedUser);
    }

    // This function deletes the user
    public void delete(UserDetails userDetails) {
        User savedUser = findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFound(userDetails.getUsername()));

        userRepo.delete(savedUser);
    }
}