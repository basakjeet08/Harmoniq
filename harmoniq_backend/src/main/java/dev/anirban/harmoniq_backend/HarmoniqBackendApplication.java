package dev.anirban.harmoniq_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HarmoniqBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(HarmoniqBackendApplication.class, args);
    }
}