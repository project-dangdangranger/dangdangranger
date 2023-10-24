package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolLogResponseMessage {
    CREATE_PATROL_LOG_SUCCESS("순찰기록 등록 성공");

    private final String message;

    PatrolLogResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
