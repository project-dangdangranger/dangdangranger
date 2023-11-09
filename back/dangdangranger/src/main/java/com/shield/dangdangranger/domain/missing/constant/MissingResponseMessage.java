package com.shield.dangdangranger.domain.missing.constant;

public enum MissingResponseMessage {
	
	GET_LOCAL_MISSING_COUNT_SUCCESS("우리동네 실종견 수 조회 완료"),
	GET_MISSING_SUCCESS("실종견 상세정보 조회 성공"),
	MISSING_NOT_FOUND("실종견 정보를 찾을 수 없습니다."),
	CREATE_MISSING_SUCCESS("실종견 등록 성공"),
	READ_ALL_MISSING("실종견 정보 리스트 조회 성공");
	
	private final String message;

	MissingResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
