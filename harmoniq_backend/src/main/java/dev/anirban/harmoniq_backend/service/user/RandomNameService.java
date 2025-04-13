package dev.anirban.harmoniq_backend.service.user;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class RandomNameService {
    private static final List<String> FIRST_NAMES = List.of(
            "Nova", "Orion", "Jett", "Blade", "Echo", "Neon", "Cyber", "Vega", "Zane", "Rex",
            "Maverick", "Kairos", "Xenon", "Axel", "Ryker", "Dante", "Zero", "Nyx", "Cairo",
            "Titan", "Ragnar", "Vortex", "Cosmo", "Flux", "Kairo", "Zephyr", "Shade", "Cortex",

            // 🏹 Fantasy & Mythology
            "Eldor", "Lyra", "Draven", "Seraphis", "Kael", "Nyx", "Thalor", "Orin", "Zephara",
            "Aether", "Elysia", "Ashen", "Flint", "Ember", "Sierra", "Storm", "Thorne", "Glade",
            "Ravena", "Azriel", "Sylas", "Kieran", "Lorien", "Vaelin", "Caius", "Elowen",

            // 🎮 Video Game & Anime-Inspired
            "Ezio", "Luna", "Ciri", "Kratos", "Yuna", "Geralt", "Dante", "Sephiroth",
            "Cloud", "Tifa", "Ryu", "Kenshin", "Levi", "Asuka", "Shinra", "Vash",
            "Alucard", "Nero", "Ardyn", "Jinx", "Viktor", "Silco", "Vi", "Zed",

            // 🌍 Classic Names
            "Alexander", "Maximus", "Isabella", "Victoria", "Julian", "Sophia", "Nathaniel",
            "Sebastian", "Benjamin", "Eleanor", "Matthias", "Adrian", "Damian", "Lucian"
    );

    private static final List<String> LAST_NAMES = List.of(
            // ⚡ Sci-Fi & Cyberpunk
            "Stormrider", "Shadowfax", "Quantum", "Neonblade", "Cybernova",
            "Hyperstream", "Voidwalker", "Nebulon", "Xenotech", "Mechaflux",

            // 🏹 Fantasy & Mythology
            "Stormborn", "Dragonsbane", "Nightshade", "Moonwhisper", "Darkmoor",
            "Ravenshadow", "Starfall", "Thunderfury", "Duskbane", "Silverfang",

            // 🎮 Video Game & Anime-Inspired
            "Hellsing", "Strife", "Fairbrook", "Armitage", "Zoldyck", "Kamado",
            "Targaryen", "Kenobi", "Uchiha", "Hoshigaki", "Rengoku", "Beoulve",

            // 🌍 Classic Last Names
            "Hawthorne", "Montague", "Everest", "Belmont", "Lothbrook",
            "Blackwood", "Rutherford", "Valentine", "Kingsley", "Whitmore"
    );

    private final Random random = new Random();

    public String generateRandomName() {
        String firstName = FIRST_NAMES.get(random.nextInt(FIRST_NAMES.size()));
        String lastName = LAST_NAMES.get(random.nextInt(LAST_NAMES.size()));

        return firstName + " " + lastName;
    }
}