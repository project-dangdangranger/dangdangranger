package com.shield.dangdangranger.domain.missing.constant;

public enum MissingType {
    MISSING(0),
    ABANDONED(1);

    private final Integer value;

    MissingType(Integer value) {
        this.value = value;
    }

    public Integer value() {
        return this.value;
    }
}
