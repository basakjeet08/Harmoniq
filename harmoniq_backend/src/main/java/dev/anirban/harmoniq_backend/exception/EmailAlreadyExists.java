package dev.anirban.harmoniq_backend.exception;

public class EmailAlreadyExists extends RuntimeException {
    public EmailAlreadyExists(String email) {
        super("The provided email : " + email + " already exists! Please login with your email id");
    }
}