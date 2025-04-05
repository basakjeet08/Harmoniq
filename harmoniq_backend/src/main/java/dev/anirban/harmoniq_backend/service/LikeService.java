package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.entity.Like;
import dev.anirban.harmoniq_backend.entity.Thread;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.exception.ThreadNotFound;
import dev.anirban.harmoniq_backend.exception.UserNotFound;
import dev.anirban.harmoniq_backend.repo.LikeRepository;
import dev.anirban.harmoniq_backend.repo.ThreadRepository;
import dev.anirban.harmoniq_backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeService {

    private final UserRepository userRepo;
    private final ThreadRepository threadRepo;
    private final LikeRepository likeRepo;

    // This function creates a new like
    @Transactional
    public Like create(User user, Thread thread) {
        Like newLike = Like
                .builder()
                .build();

        // Managing the relationships
        user.addLikes(newLike);
        thread.addLikes(newLike);

        return likeRepo.save(newLike);
    }

    // This function toggles the like to unlike and vice versa
    @Transactional
    public void toggleLike(UserDetails userDetails, String threadId) {
        // Fetching the user
        User user = userRepo
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UserNotFound(userDetails.getUsername()));

        // Fetching the Thread
        Thread thread = threadRepo
                .findById(threadId)
                .orElseThrow(() -> new ThreadNotFound(threadId));

        // Checking if we have any Like for the specific thread already
        Optional<Like> existingLike = likeRepo.findByUserAndThread(user, thread);

        // Checking if the thread is already liked or not
        if (existingLike.isPresent())
            deleteLike(existingLike.get());
        else
            create(user, thread);
    }

    // This function deletes the specific like
    @Transactional
    public void deleteLike(Like like) {
        likeRepo.delete(like);
    }
}