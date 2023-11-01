package com.shield.dangdangranger.domain.user.constant;

public enum UserExceptionMessage {
    USER_NOT_FOUND_EXCEPTION("사용자가 존재하지 않음");

    private final String message;

    UserExceptionMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
