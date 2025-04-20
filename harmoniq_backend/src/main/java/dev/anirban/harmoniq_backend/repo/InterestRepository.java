package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.threads.Tag;
import dev.anirban.harmoniq_backend.entity.user.Interest;
import dev.anirban.harmoniq_backend.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, String> {
    List<Interest> findByUserAndTagIn(User user, List<Tag> tags);

    List<Interest> findByScore(Integer score);
}