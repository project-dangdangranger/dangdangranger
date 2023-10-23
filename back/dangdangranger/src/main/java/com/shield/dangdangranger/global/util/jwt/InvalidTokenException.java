package com.shield.dangdangranger.global.util.jwt;

import com.shield.dangdangranger.global.error.TokenException;

public class InvalidTokenException extends TokenException {
    public InvalidTokenException() {}
    public InvalidTokenException(String message) {
        super(message);
    }
}
