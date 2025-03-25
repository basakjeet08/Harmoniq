package dev.anirban.harmoniq_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class AvatarService {
    @Value("${app.image.base-url}")
    private String imageBaseUrl;

    private static final List<String> AVATARS_MEN = List.of(
            "/avatars/men/avatar1.png",
            "/avatars/men/avatar2.png",
            "/avatars/men/avatar3.png",
            "/avatars/men/avatar4.png",
            "/avatars/men/avatar5.png",
            "/avatars/men/avatar6.jpg",
            "/avatars/men/avatar7.jpg",
            "/avatars/men/avatar8.jpg",
            "/avatars/men/avatar9.avif"
    );

    private final Random random = new Random();

    public String generateAvatar() {
        String relativePath = AVATARS_MEN.get(random.nextInt(AVATARS_MEN.size()));
        return imageBaseUrl + relativePath;
    }
}