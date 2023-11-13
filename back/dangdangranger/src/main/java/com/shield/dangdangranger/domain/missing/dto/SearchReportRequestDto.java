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
	
	@Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
	public static class SearchReportListRequestDto {
		private Integer missingNo;
	}
	
	@Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
	public static class SearchReportUpdateRequestDto {
		private Integer searchReportNo;
		private String searchReportContent;
		private Double searchReportLat;
		private Double searchReportLng;
		private List<String> searchReportImages;
	}
}
