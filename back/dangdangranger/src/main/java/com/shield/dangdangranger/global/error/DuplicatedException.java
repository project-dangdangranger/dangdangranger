package com.shield.dangdangranger.global.error;

import lombok.Getter;

@Getter
public class DuplicatedException extends IllegalArgumentException{
	Object params;
	
    public DuplicatedException(){}
    public DuplicatedException(String msg){super(msg);}
    public DuplicatedException(String msg, Object params){
    	super(msg);
    	this.params = params;
    }
}
