package com.shield.dangdangranger.domain.badge.constant;

import lombok.Getter;

@Getter
public enum BadgeResponseMessage {
    BADGE_LIST_READ_SUCCESS("사용자 뱃지 리스트 조회 성공"),
    BADGE_INFO_READ_SUCCESS("사용자 뱃지 상세 조회 성공"),
    BADGE_INFO_READ_FAIL("사용자 뱃지 상세 조회 실패: 뱃지 없음");

    private final String message;

    BadgeResponseMessage(String message){this.message = message;}
}
