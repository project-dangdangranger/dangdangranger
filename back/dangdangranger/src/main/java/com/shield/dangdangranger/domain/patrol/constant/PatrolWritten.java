package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolWritten {
    WRITTEN(0),
    NOT_WRITTEN(1);

    private final Integer value;

    PatrolWritten(Integer value) {
        this.value = value;
    }

    public Integer value() {
        return this.value;
    }
}
