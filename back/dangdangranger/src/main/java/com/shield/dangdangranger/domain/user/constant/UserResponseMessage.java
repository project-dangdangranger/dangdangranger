package com.shield.dangdangranger.domain.user.constant;

public enum UserResponseMessage {
    SIGN_IN_SUCCESS("로그인 완료"),
    GET_USER_INFO_SUCCESS("회원 정보 조회 완료"),
    DELETE_USER_SUCCESS("회원 탈퇴 완료"),
    UPDATE_USER_MESSAGE_SUCCESS("회원 상태 메시지 수정 완료"),
    UPDATE_USER_INFO_SUCCESS("회원 정보 수정 완료"),
    REISSUE_ACCESS_TOKEN__SUCCESS("액세스 토큰 발급 완료"),
    USER_WALLET_PW_CORRECT("지갑 비밀번호 일치"),
    UPDATE_USER_WALLET_SUCCESS("회원 지갑 수정 완료")
    ;

    private final String message;

    UserResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
