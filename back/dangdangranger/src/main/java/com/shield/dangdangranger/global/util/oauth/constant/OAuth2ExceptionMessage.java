package com.shield.dangdangranger.global.util.oauth.constant;

public enum OAuth2ExceptionMessage {
    INVALID_TOKEN("유효하지 않은 토큰"), EXPIRED_TOKEN("만료된 토큰"), NOTFOUND_TOKEN("토큰 없음");

    private String message;

    OAuth2ExceptionMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
