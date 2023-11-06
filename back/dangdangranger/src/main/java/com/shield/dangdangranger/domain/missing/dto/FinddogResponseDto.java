package com.shield.dangdangranger.domain.missing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class FinddogResponseDto {

	
	@Getter
    @AllArgsConstructor
    @Builder
    public static class FinddogSessionResponseDto {
        private String topicId;
        
    }
}
