package com.shield.dangdangranger.domain.missing.message;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class FinddogMessage implements Serializable {

	private static final long serialVersionUID = 1L;
	
	public enum Code {
		ENTER,
		SHARE_COORDINATE,
		EXIT, 
		END_SESSION
	}
	
	private Code code;
	private Integer userNo;
	private Integer missingNo;
	private String topicId;
	private Object param;
	
}
