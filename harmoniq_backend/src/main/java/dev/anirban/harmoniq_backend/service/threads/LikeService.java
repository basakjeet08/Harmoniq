package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.entity.threads.Like;
import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.threads.Thread;
import dev.anirban.harmoniq_backend.entity.threads.ThreadTag;
import dev.anirban.harmoniq_backend.entity.user.User;
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

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeService {

    private final UserRepository userRepo;
    private final ThreadRepository threadRepo;
    private final LikeRepository likeRepo;
    private final InterestService interestService;

    // This function creates a new like
    @Transactional
    public Like create(User user, Thread thread) {
        // fetching the thread tags list (Only 3 tags are there so this is fine)
        List<Tag> tags = thread
                .getThreadTags()
                .stream()
                .map(ThreadTag::getTag)
                .toList();

        // Updating the necessary thread and interest details
        thread.incrementTotalLikesCount();
        interestService.markPositiveInterest(tags, user);

        // Creating a new Like Object
        Like newLike = Like
                .builder()
                .user(user)
                .thread(thread)
                .build();

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
        // fetching the thread tags list (Only 3 tags are there so this is fine)
        List<Tag> tags = like
                .getThread()
                .getThreadTags()
                .stream()
                .map(ThreadTag::getTag)
                .toList();

        // Reducing the interests
        interestService.markNegativeInterest(tags, like.getUser());

        // Removing the likes from the thread
        like.getThread().decrementTotalLikesCount();
        likeRepo.delete(like);
    }
}