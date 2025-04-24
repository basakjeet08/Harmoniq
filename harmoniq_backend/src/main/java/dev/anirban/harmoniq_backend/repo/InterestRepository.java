package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.user.Interest;
import dev.anirban.harmoniq_backend.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, String> {
    // This function fetches the interests which align with the given tags
    List<Interest> findByUserAndTagIn(User user, List<Tag> tags);

    // This function fetches the interests with a specific score
    List<Interest> findByScore(Integer score);
}