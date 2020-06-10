package com.example.main.exception;

public class WorksNotFoundException extends RuntimeException{
    public WorksNotFoundException(String message) {
        super(message);
    }
}
