package com.shield.dangdangranger.domain.missing.constant;

public enum MissingResponseMessage {
	
	GET_LOCAL_MISSING_DOG_COUNT_SUCCESS("우리동네 실종견 수 조회 완료");
	
	private final String message;

	MissingResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
