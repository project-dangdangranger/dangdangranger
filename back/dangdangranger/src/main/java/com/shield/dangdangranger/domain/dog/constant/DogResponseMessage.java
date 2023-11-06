package com.shield.dangdangranger.domain.dog.constant;

import lombok.Getter;

@Getter
public enum DogResponseMessage {

    DOG_REGIST_SUCCESS("강아지 등록 성공"),
    DOG_LIST_READ_SUCCESS("강아지 리스트 조회 성공"),
    DOG_INFO_READ_SUCCESS("강아지 상세 조회 성공"),
    DOG_INFO_READ_FAIL("강아지 상세 조회 실패: 강아지 없음"),
    BREED_NOT_FOUND_EXCEPTION("견종 키워드 검색 실패"),
    READ_ALL_BREED("견종 전체 목록 조회 완료"),
    READ_ALL_BREED_BY_KEYWORD("키워드로 검색된 견종 목록 조회 완료")
    ;

    private final String message;

    DogResponseMessage(String message){this.message = message; }

}
