package com.shield.dangdangranger.domain.missing.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class SearchReportRequestDto {
	
	@Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
	public static class SearchReportSaveRequestDto {
		private Integer missingNo;
		private Integer userNo;
		private String searchReportContent;
		private Double searchReportLat;
		private Double searchReportLng;
		private List<String> searchReportImages;
	}
	
}
