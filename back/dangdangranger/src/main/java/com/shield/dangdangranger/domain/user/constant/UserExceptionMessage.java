package com.shield.dangdangranger.domain.user.constant;

public enum UserExceptionMessage {
    USER_NOT_FOUND_EXCEPTION("사용자가 존재하지 않음"),
    USER_WALLET_PW_NOT_CORRECT("지갑 비밀번호 불일치")
    ;

    private final String message;

    UserExceptionMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
