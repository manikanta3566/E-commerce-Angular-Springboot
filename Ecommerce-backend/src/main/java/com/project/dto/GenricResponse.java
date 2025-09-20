package com.project.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GenricResponse<T> {
    private LocalDateTime timestamp;
    private boolean success;
    private T data;
    private String errorCode;
    private String message;

    private GenricResponse(boolean success, T data, String errorCode, String message) {
        this.timestamp = LocalDateTime.now();
        this.success = success;
        this.data = data;
        this.errorCode = errorCode;
        this.message = message;
    }

    // Factory methods for success & error
    public static <T> GenricResponse<T> success(T data, String message) {
        return new GenricResponse<>(true, data, null, message);
    }

    public static <T> GenricResponse<T> error(String errorCode, String message) {
        return new GenricResponse<>(false, null, errorCode, message);
    }

}
