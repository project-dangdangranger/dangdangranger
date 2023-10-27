package com.shield.dangdangranger.domain.user.constant;

public enum SignInUp {
    SIGN_IN("로그인 성공"),
    SIGN_UP("회원가입 성공");

    private final String message;

    SignInUp(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
