package com.shield.dangdangranger.global.util.jwt;

import com.shield.dangdangranger.global.error.TokenException;

public class ExpiredTokenException extends TokenException {
    public ExpiredTokenException() {}
    public ExpiredTokenException(String message) {
        super(message);
    }
}
