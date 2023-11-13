package com.shield.dangdangranger.domain.missing.constant;

public enum SeachReportResponseMessage {
	
	CREATE_SEARCH_REPORT_SUCCESS("실종견 발견 신고 등록 성공");

	private final String message;

	SeachReportResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
