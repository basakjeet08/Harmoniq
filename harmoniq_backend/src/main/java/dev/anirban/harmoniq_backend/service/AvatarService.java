package dev.anirban.harmoniq_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


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

    private final Random random = new Random();

    // This function returns all the avatars
    public List<String> getAllAvatars() {
        List<String> allAvatars = new ArrayList<>();
        allAvatars.addAll(AVATARS_MEN);
        allAvatars.addAll(AVATARS_WOMEN);
        allAvatars.addAll(AVATARS_OTHERS);

        allAvatars = allAvatars
                .stream()
                .map(avatar -> imageBaseUrl + avatar)
                .toList();

        return allAvatars;
    }

    // This function returns a random avatar
    public String generateAvatar() {
        List<String> allAvatars = getAllAvatars();
        return allAvatars.get(random.nextInt(allAvatars.size()));
    }

    // This function returns the chatbot avatar
    public String getChatbotAvatar() {
        return imageBaseUrl + "/avatars/chatbot/chatbot.jpg";
    }
}