package dev.anirban.harmoniq_backend.exception;

import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handling the global exception. This handles any and all exceptions thrown in the backend
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseWrapper<String>> handleException(Exception exception) {
        ResponseWrapper<String> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

    // Handling User not found Exception
    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<ResponseWrapper<Void>> handleUserNotFoundException(UserNotFound exception) {
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    // Handling Thread not found Exception
    @ExceptionHandler(ThreadNotFound.class)
    public ResponseEntity<ResponseWrapper<Void>> handleThreadNotFound(ThreadNotFound exception) {
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    // Handle Un Authorized Exception
    @ExceptionHandler(UnAuthorized.class)
    public ResponseEntity<ResponseWrapper<Void>> handleUnAuthorizedException(UnAuthorized exception) {
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }

    // Handle Conversation not found exception
    @ExceptionHandler(ConversationNotFound.class)
    public ResponseEntity<ResponseWrapper<Void>> handleConversationNotFoundException(ConversationNotFound exception) {
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}