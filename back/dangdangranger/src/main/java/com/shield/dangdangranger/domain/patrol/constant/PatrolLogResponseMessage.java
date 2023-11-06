package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolLogResponseMessage {
    CREATE_PATROL_LOG_SUCCESS("순찰기록 등록 성공"),
    READ_ALL_PATROL_LOG_SUCCESS("순찰기록 리스트 조회 성공"),
    READ_ONE_PATROL_LOG_SUCCESS("순찰기록 조회 성공"),
    PATROL_LOG_NOT_FOUND_EXCEPTION("순찰기록 1개 조회 실패"),
    ADD_PATROL_PERSON_SUCCESS("순찰 중인 사람 추가 완료"),
    READ_PATROL_PEOPLE_CNT("순찰 중인 인원 조회 완료")
    ;

    private final String message;

    PatrolLogResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
