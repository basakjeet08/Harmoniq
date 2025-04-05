package dev.anirban.harmoniq_backend.service;

import dev.anirban.harmoniq_backend.entity.Interest;
import dev.anirban.harmoniq_backend.entity.Tag;
import dev.anirban.harmoniq_backend.entity.User;
import dev.anirban.harmoniq_backend.repo.InterestRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    @Transactional
    public Interest createNewInterest(User user, Tag tag) {
        // New Interest Object Created
        Interest interest = Interest
                .builder()
                .score(1)
                .lastVisited(LocalDateTime.now())
                .build();

        // For Managing the Bi Directional Relationship
        user.addInterest(interest);
        tag.addInterest(interest);

        return interestRepo.save(interest);
    }

    // This function updates the interest based on the list of tags and the user
    @Transactional
    public void updateUserInterestsFromPostTags(List<Tag> tagList, User user) {
        // Fetching all the current user interest
        List<Interest> userInterests = findAllUserInterest(user);

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

    // This function fetches all the user interests
    public List<Interest> findAllUserInterest(User user) {
        return interestRepo.findByUser(user);
    }
}