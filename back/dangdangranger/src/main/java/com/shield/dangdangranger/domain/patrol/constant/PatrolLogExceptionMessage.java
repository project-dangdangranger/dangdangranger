package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolLogExceptionMessage {
    PATROL_LOG_NOT_FOUND_EXCEPTION("순찰 기록 상세 조회 실패 : 순찰 기록 없음");

    private final String message;
    PatrolLogExceptionMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
