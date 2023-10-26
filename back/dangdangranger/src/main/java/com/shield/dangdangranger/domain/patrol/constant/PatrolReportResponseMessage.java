package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolReportResponseMessage {

    CREATE_PATROL_REPORT_SUCCESS("순찰일지 등록 성공"),
    READ_ALL_PATROL_REPORT("모든 순찰일지 리스트 조회 완료")
    ;

    private final String message;

    PatrolReportResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
