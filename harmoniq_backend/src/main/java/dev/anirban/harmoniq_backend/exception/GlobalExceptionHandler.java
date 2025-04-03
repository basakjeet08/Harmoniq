package dev.anirban.harmoniq_backend.exception;

import dev.anirban.harmoniq_backend.dto.common.ResponseWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    // Handling the global exception. This handles any and all exceptions thrown in the backend
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseWrapper<String>> handleException(Exception exception) {
        log.warn("(X) - Unhandled Exception  - {}", exception.getMessage());
        ResponseWrapper<String> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

    // Handling the user already exists exception
    @ExceptionHandler(EmailAlreadyExists.class)
    public ResponseEntity<ResponseWrapper<String>> handleEmailExistsException(EmailAlreadyExists exception) {
        log.warn("(X) - Email Exists Exception  - {}", exception.getMessage());
        ResponseWrapper<String> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    // Handling User not found Exception
    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<ResponseWrapper<Void>> handleUserNotFoundException(UserNotFound exception) {
        log.warn("(X) - User not found - {}", exception.getMessage());
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    // Handling Thread not found Exception
    @ExceptionHandler(ThreadNotFound.class)
    public ResponseEntity<ResponseWrapper<Void>> handleThreadNotFound(ThreadNotFound exception) {
        log.warn("(X) - Thread not found - {}", exception.getMessage());
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    // Handle Un Authorized Exception
    @ExceptionHandler(UnAuthorized.class)
    public ResponseEntity<ResponseWrapper<Void>> handleUnAuthorizedException(UnAuthorized exception) {
        log.warn("(X) - UnAuthorized operation - {}", exception.getMessage());
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }

    // Handle Conversation not found exception
    @ExceptionHandler(ConversationNotFound.class)
    public ResponseEntity<ResponseWrapper<Void>> handleConversationNotFoundException(ConversationNotFound exception) {
        log.warn("(X) - Conversation not found - {}", exception.getMessage());
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}