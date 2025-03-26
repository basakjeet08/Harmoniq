package dev.anirban.harmoniq_backend.exception;

public class ConversationNotFound extends RuntimeException {
    public ConversationNotFound(String id) {
        super("Conversation Window with the Id : " + id + " is not found !!");
    }
}