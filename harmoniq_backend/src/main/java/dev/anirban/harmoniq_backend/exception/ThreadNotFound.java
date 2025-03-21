package dev.anirban.harmoniq_backend.exception;

public class ThreadNotFound extends RuntimeException {
    public ThreadNotFound(String id) {
        super("Thread with the given id " + id + " does not exists");
    }
}