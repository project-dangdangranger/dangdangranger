package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolReportResponseMessage {

    CREATE_PATROL_REPORT_SUCCESS("순찰일지 등록 성공"),
    READ_ALL_PATROL_REPORT("모든 순찰일지 리스트 조회 완료"),
    READ_MY_PATROL_REPORT("사용자의 순찰일지 리스트 조회 완료"),
    READ_ONE_PATROL_REPORT("순찰일지 상세조회 완료"),
    PATROL_REPORT_NOT_FOUND_EXCEPTION("순찰일지 1개 조회 실패"),
    PATROL_REPORT_UPDATE_SUCCESS("순찰일지 수정 성공"),
    PATROL_REPORT_DELETE_SUCCESS("순찰일지 삭제 성공"),
    SEARCH_BY_TITLE_SUCCESS("순찰일지 제목 검색 성공"),
    SEARCH_BY_CONTENT_SUCCESS("순찰일지 내용 검색 성공"),
    SEARCH_BY_TITLE_AND_CONTENT_SUCCESS("순찰일지 제목 및 내용 검색 성공")
    ;

    private final String message;

    PatrolReportResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
