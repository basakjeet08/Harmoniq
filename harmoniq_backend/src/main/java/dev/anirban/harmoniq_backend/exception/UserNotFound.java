package dev.anirban.harmoniq_backend.exception;

public class UserNotFound extends RuntimeException {
    public UserNotFound(String email) {
        super("User with the email " + email + " does not exists! Please enter a valid email and password");
    }
}