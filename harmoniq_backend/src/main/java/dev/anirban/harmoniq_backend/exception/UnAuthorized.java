package dev.anirban.harmoniq_backend.exception;

public class UnAuthorized extends RuntimeException {
    public UnAuthorized() {
        super("The current operation requested is not Authorized by this user");
    }
}