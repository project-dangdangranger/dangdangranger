package com.shield.dangdangranger.domain.region.constant;

public enum RegionResponseMessage {
    READ_SIDO_SUCCESS("시/도 조회 완료"),
    READ_GUGUN_SUCCESS("구/군 조회 완료"),
    READ_DONG_SUCCESS("동 조회 완료")
    ;

    String message;
    RegionResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
