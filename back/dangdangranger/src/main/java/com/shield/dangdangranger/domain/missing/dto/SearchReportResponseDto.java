package com.shield.dangdangranger.domain.missing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class SearchReportResponseDto {
	
	@Getter
    @AllArgsConstructor
    @Builder
    public static class SearchReportSaveResponseDto {
		private Integer searchReportNo;
	}

}
