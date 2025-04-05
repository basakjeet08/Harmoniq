package dev.anirban.harmoniq_backend.repo;

import dev.anirban.harmoniq_backend.entity.Interest;
import dev.anirban.harmoniq_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, String> {
    List<Interest> findByUser(User user);
}