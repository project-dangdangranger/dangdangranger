package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolLogResponseMessage {
    CREATE_PATROL_LOG_SUCCESS("순찰기록 등록 성공"),
    READ_ALL_PATROL_LOG_SUCCESS("순찰기록 리스트 조회 성공"),
    READ_ONE_PATROL_LOG_SUCCESS("순찰기록 조회 성공"),
    PATROL_LOG_NOT_FOUND_EXCEPTION("순찰기록 1개 조회 실패"),
    ;

    private final String message;

    PatrolLogResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
