package com.shield.dangdangranger.domain.missing.constant;

public enum MissingStatus {
    MISSING(0),
    FOUND(1);

    private final Integer value;

    MissingStatus(Integer value) {
        this.value = value;
    }

    public Integer value() {
        return this.value;
    }
}
