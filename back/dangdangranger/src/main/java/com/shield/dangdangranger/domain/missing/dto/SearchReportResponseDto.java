package com.shield.dangdangranger.domain.missing.dto;

import java.util.List;

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

	@Getter
    @AllArgsConstructor
    @Builder
    public static class SearchReportInfoResponseDto {
		private Integer searchReportNo;
		private Integer missingNo;
		private Integer userNo;
		private String searchReportContent;
		private Double searchReportLat;
		private Double searchReportLng;
		private List<String> searchReportImages;
	}
}
