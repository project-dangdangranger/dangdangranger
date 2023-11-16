package com.shield.dangdangranger.global.error;

public class ForbiddenException extends SecurityException {
    public ForbiddenException(){}
    public ForbiddenException(String msg){super(msg);}
}
