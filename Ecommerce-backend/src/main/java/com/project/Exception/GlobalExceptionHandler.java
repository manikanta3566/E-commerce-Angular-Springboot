package com.project.Exception;

import com.project.dto.GenricResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<GenricResponse<?>> handleGenericException(GlobalException ex,
                                                                    HttpServletRequest request) {
        return new ResponseEntity<>(
                GenricResponse.error(ex.getErrorCode().getCode(), ex.getMessage()),
                HttpStatus.BAD_REQUEST // or map code to HTTP status
        );
    }
}

