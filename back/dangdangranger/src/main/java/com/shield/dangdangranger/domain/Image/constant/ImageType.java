package com.shield.dangdangranger.domain.Image.constant;

public enum ImageType {
	PATROL_LOG		(1,	"L",	"순찰로그"),
	PATROL_REPORT	(2,	"R",	"순찰일지"),
	MISSING			(3,	"M",	"내강아지실종신고"),
	FOUND			(4,	"F",	"실종견발견");
	
	private final Integer value;
	private final String code;
	private final String desc;
	
	ImageType(Integer value, String code, String desc) {
		this.value = value;
		this.code = code;
		this.desc = desc;
	}
	
	public Integer value() {
        return this.value;
    }
	
	public String code() {
        return this.code;
    }
	
	public String desc() {
        return this.desc;
    }
}
