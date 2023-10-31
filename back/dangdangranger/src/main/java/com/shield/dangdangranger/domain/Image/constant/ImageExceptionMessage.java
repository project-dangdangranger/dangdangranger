package com.shield.dangdangranger.domain.Image.constant;

public enum ImageExceptionMessage {

    IMAGE_NOT_FOUND_EXCEPTION("이미지 없음");

    private final String message;
    ImageExceptionMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
