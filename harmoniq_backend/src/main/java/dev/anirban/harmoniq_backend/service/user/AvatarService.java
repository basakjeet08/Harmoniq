package dev.anirban.harmoniq_backend.service.user;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Slf4j
@Service
public class AvatarService {
    @Value("${app.image.base-url}")
    private String imageBaseUrl;

    // Men's Avatars
    private final List<String> AVATARS_MEN = List.of(
            "/avatars/men/avatar1.jpg",
            "/avatars/men/avatar2.jpg",
            "/avatars/men/avatar3.jpg",
            "/avatars/men/avatar4.jpg",
            "/avatars/men/avatar5.jpg",
            "/avatars/men/avatar6.jpg",
            "/avatars/men/avatar7.jpg",
            "/avatars/men/avatar8.jpg"
    );

    // Women's Avatars
    private final List<String> AVATARS_WOMEN = List.of(
            "/avatars/women/avatar1.jpg",
            "/avatars/women/avatar2.jpg",
            "/avatars/women/avatar3.jpg",
            "/avatars/women/avatar4.jpg",
            "/avatars/women/avatar5.jpg",
            "/avatars/women/avatar6.jpg",
            "/avatars/women/avatar7.jpg",
            "/avatars/women/avatar8.jpg"
    );

    // Others Avatars
    private final List<String> AVATARS_OTHERS = List.of(
            "/avatars/others/avatar1.jpg",
            "/avatars/others/avatar2.jpg",
            "/avatars/others/avatar3.jpg",
            "/avatars/others/avatar4.jpg",
            "/avatars/others/avatar5.jpg",
            "/avatars/others/avatar6.jpg",
            "/avatars/others/avatar7.jpg",
            "/avatars/others/avatar8.jpg",
            "/avatars/others/avatar9.jpg",
            "/avatars/others/avatar10.jpg",
            "/avatars/others/avatar11.jpg",
            "/avatars/others/avatar12.jpg",
            "/avatars/others/avatar13.jpg"
    );

    private List<String> cachedAvatars;

    @PostConstruct
    public void initializeAvatarList() {
        log.info("(/) - Caching the avatars and storing them for faster retrieval !!");

        List<String> avatarList = new ArrayList<>();
        avatarList.addAll(AVATARS_MEN);
        avatarList.addAll(AVATARS_WOMEN);
        avatarList.addAll(AVATARS_OTHERS);

        cachedAvatars = avatarList
                .stream()
                .map(avatar -> imageBaseUrl + avatar)
                .toList();
    }

    private final Random random = new Random();

    // This function returns all the avatars
    public List<String> getAllAvatars() {
        return cachedAvatars;
    }

    // This function returns a random avatar
    public String generateAvatar() {
        return cachedAvatars.get(random.nextInt(cachedAvatars.size()));
    }
}