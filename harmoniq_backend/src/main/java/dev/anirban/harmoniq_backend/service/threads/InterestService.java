package dev.anirban.harmoniq_backend.service.threads;

import dev.anirban.harmoniq_backend.entity.user.Interest;
import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.user.User;
import dev.anirban.harmoniq_backend.repo.InterestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InterestService {
    private final InterestRepository interestRepo;

    // This function creates a new Interest based on the user and tag
    public Interest createNewInterest(User user, Tag tag) {
        // New Interest Object Created
        Interest interest = Interest
                .builder()
                .score(1)
                .lastVisited(LocalDateTime.now())
                .user(user)
                .tag(tag)
                .build();

        return interestRepo.save(interest);
    }

    // This function updates the interest based on the list of tags and the user
    @Transactional
    public void markPositiveInterest(List<Tag> tagList, User user) {
        // Fetching all the current user interest
        List<Interest> userInterests = findAllUserInterest(user, tagList);

        // Storing all the user interests on the map for a quick look up
        Map<String, Interest> interestMap = userInterests
                .stream()
                .collect(Collectors.toMap(i -> i.getTag().getId(), i -> i));

        // Looping through all the tags and updating the score for each tag
        tagList.forEach(tag -> {
            // Checking if the interest exists
            Interest existing = interestMap.get(tag.getId());

            // Checking if the interest already exists otherwise we create a new Interest
            if (existing == null) {
                Interest newInterest = createNewInterest(user, tag);
                userInterests.add(newInterest);
            } else
                existing.increaseScore();
        });

        // Updating the new interest list after updating it
        interestRepo.saveAll(userInterests);
    }

    // This function decreases interests based on tags and user
    @Transactional
    public void markNegativeInterest(List<Tag> tagList, User user) {
        // Fetching all the current user interest
        List<Interest> userInterests = findAllUserInterest(user, tagList);

        // Storing all the user interests on the map for a quick look up
        Map<String, Interest> interestMap = userInterests
                .stream()
                .collect(Collectors.toMap(i -> i.getTag().getId(), i -> i));

        // Looping through all the tags and updating the score for each tag
        tagList.forEach(tag -> {
            // Checking if the interest exists
            Interest existing = interestMap.get(tag.getId());

            // Checking if the interest already exists otherwise we create a new Interest
            if (existing != null)
                existing.decreaseScore();
        });

        // Updating the interests list after updating
        interestRepo.saveAll(userInterests);
    }

    // This function fetches all the user interests
    public List<Interest> findAllUserInterest(User user, List<Tag> tags) {
        return interestRepo.findByUserAndTagIn(user, tags);
    }

    // This function is a cron job that clears all the un - wanted interests
    @Scheduled(cron = "0 0 0 * * *")
    public void clearUnwantedInterest() {
        List<Interest> interestList = interestRepo.findByScore(0);

        // When there are unused tags we delete it
        log.info("(|) - Checking for unused interests and found {} unused tags to delete !!", interestList.size());

        if (!interestList.isEmpty())
            interestRepo.deleteAll(interestList);
    }

    // This function is the decay function which reduces the score of all the interests
    @Scheduled(cron = "0 0 0 * * MON")
    @Transactional
    public void decayInterest() {
        // fetching all the interests
        List<Interest> allSavedInterest = interestRepo.findAll();
        log.info("(|) - Decaying Interest started for {} Interests", allSavedInterest.size());

        // Decreasing the scores of each interest
        allSavedInterest.forEach(Interest::decreaseScore);

        // Saving all the interests
        interestRepo.saveAll(allSavedInterest);
    }
}