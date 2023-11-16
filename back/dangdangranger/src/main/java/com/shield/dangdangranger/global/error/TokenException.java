package com.shield.dangdangranger.global.error;

public class TokenException extends IllegalArgumentException {

    public TokenException() {
    }

    public TokenException(String msg) {
        super(msg);
    }
}
