package com.shield.dangdangranger.domain.missing.constant;

public enum FinddogResponseMessage {
	
	CREATE_SESSION_SUCCESS("함께찾기 세션 생성 성공");
	
	private final String message;

	FinddogResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
