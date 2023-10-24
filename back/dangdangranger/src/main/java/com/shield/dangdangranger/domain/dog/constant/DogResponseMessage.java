package com.shield.dangdangranger.domain.dog.constant;

public enum DogResponseMessage {

    DOG_REGIST_SUCCESS("강아지 등록 성공"),
    DOG_LIST_READ_SUCCESS("강아지 리스트 조회 성공"),
    DOG_INFO_READ_SUCCESS("강아지 상세 조회 성공"),
    DOG_INFO_READ_FAIL("강아지 상세 조회 실패: 강아지 없음");

    private final String message;

    DogResponseMessage(String message){this.message = message; }

    public String getMessage() {return this.message; }
}
