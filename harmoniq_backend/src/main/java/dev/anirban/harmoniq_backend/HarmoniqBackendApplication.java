package dev.anirban.harmoniq_backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@Slf4j
public class HarmoniqBackendApplication {
    public static void main(String[] args) {
        log.info("(/) - Started the Spring Boot Application ....");
        SpringApplication.run(HarmoniqBackendApplication.class, args);
    }
}