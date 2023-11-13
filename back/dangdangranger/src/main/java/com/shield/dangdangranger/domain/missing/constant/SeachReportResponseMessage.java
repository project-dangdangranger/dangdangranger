package com.shield.dangdangranger.domain.missing.constant;

public enum SeachReportResponseMessage {
	
	CREATE_SEARCH_REPORT_SUCCESS("실종견 발견 신고 등록 성공"),
	GET_SEARCH_REPORT_LIST_SUCCESS("실종견 발견 신고 목록 조회 성공"),
	GET_SEARCH_REPORT_SUCCESS("실종견 발견 신고 상세 조회 성공"),
	SEARCH_REPORT_NOT_FOUND_EXCEPTION("실종견 발견 신고 정보를 찾을 수 없습니다."), 
	UPDATE_SUCCESS("실종견 발견 신고 수정 성공"),
	SEARCH_REPORT_FORBIDDEN_EXCEPTION("수정 권한이 없습니다.");

	private final String message;

	SeachReportResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
