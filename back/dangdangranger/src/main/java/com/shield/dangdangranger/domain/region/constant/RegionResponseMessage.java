package com.shield.dangdangranger.domain.region.constant;

public enum RegionResponseMessage {
    READ_REGION_SUCCESS("지역 조회 완료")
    ;

    String message;
    RegionResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
