package com.shield.dangdangranger.domain.missing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class FinddogRequestDto {

	@Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
	public static class FinddogCreateRequestDto {
		private Integer missingNo;
	}
	
}
