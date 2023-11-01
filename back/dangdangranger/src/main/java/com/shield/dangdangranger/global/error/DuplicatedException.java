package com.shield.dangdangranger.global.error;

public class DuplicatedException extends IllegalArgumentException{
    public DuplicatedException(){}
    public DuplicatedException(String msg){super(msg);}
}
