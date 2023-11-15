package com.shield.dangdangranger.domain.region.constant;

public enum RegionErrorMessage {
    DONG_NOT_FOUND_EXCEPTION("동 코드가 존재하지 않습니다."),
    POSTAL_ADDRESS_NOT_FOUND_EXCEPTION("우편번호가 존재하지 않습니다.")
    ;

    String message;
    RegionErrorMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
