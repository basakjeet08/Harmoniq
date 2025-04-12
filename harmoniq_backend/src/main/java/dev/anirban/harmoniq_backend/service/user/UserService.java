package dev.anirban.harmoniq_backend.service.user;

import dev.anirban.harmoniq_backend.dto.auth.AuthRequest;
import dev.anirban.harmoniq_backend.dto.user.UserDto;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.EmailAlreadyExists;
import dev.anirban.harmoniq_backend.exception.UnAuthorized;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.repo.UserRepository;
import dev.anirban.harmoniq_backend.service.RandomNameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    // Pre encoded hashed password for BCRYPT
    private static final String GUEST_PASSWORD = "$2a$10$5z70HHc6G8OBE0VpXjz4jeDURcHlTznR/h/FZWw9RCcgcN8nlKXma";

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final RandomNameService randomNameService;
    private final AvatarService avatarService;

    // This function creates a Member account
    public User create(AuthRequest authRequest) {
        if (authRequest.getEmail() == null || authRequest.getEmail().isBlank())
            throw new IllegalArgumentException("Email cannot be null or blank !!");

        if (authRequest.getPassword() == null || authRequest.getPassword().isBlank())
            throw new IllegalArgumentException("Password cannot be null or blank !!");

        if (authRequest.getAvatar() == null || authRequest.getAvatar().isBlank())
            throw new IllegalArgumentException("Avatar cannot be null or blank !!");

        // Creating a user object
        User user = User
                .builder()
                .name(randomNameService.generateRandomName())
                .email(authRequest.getEmail())
                .password(encoder.encode(authRequest.getPassword()))
                .avatar(authRequest.getAvatar())
                .role(User.Type.MEMBER)
                .createdAt(LocalDateTime.now())
                .threads(new ArrayList<>())
                .comments(new ArrayList<>())
                .likes(new HashSet<>())
                .interests(new HashSet<>())
                .build();

        // Checking if the email already exists
        try {
            return userRepo.save(user);
        } catch (DataIntegrityViolationException | ConstraintViolationException ex) {
            throw new EmailAlreadyExists(authRequest.getEmail());
        }
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
                .password(GUEST_PASSWORD)
                .avatar(avatarService.generateAvatar())
                .role(User.Type.GUEST)
                .createdAt(LocalDateTime.now())
                .threads(new ArrayList<>())
                .comments(new ArrayList<>())
                .likes(new HashSet<>())
                .build();

        return userRepo.save(user);
    }

    @Scheduled(fixedRate = 600000)
    public void deleteExpiredGuests() {
        LocalDateTime expiredTime = LocalDateTime.now().minusHours(1);

        // Find all the guest accounts which have expired
        List<User> expiredGuests = userRepo.findByRoleAndCreatedAtBefore(User.Type.GUEST, expiredTime);

        // When there are guest account which are expired
        log.info("(|) - Checking for expired guests accounts and deleted {} guest accounts", expiredGuests.size());
        if (!expiredGuests.isEmpty()) {
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

        // Removing the likes from the threads. This way I don't have to manually manage the totalLikes fields
        savedUser
                .getLikes()
                .forEach(like -> like.getThread().removeLike(like));

        // Removing the comments from the threads
        savedUser
                .getComments()
                .forEach(comment -> comment.getThread().removeComment(comment));

        userRepo.delete(savedUser);
    }
}