package com.shield.dangdangranger.domain.missing.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class MissingRequestDto {

	@Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
	public static class MissingSaveRequestDto {
		private Integer missingTypeNo;
		private Integer dogNo;
		private String missingTitle;
		private String missingContent;
		private LocalDateTime missingDate;
		private Double missingLat;
		private Double missingLng;
		private List<String> missingImages;
	}
	
	@Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MissingUpdateRequestDto {
        private Integer missingNo;
        private String missingTitle;
        private String missingContent;
		private LocalDateTime missingDate;
		private Double missingLat;
		private Double missingLng;
        private List<String> missingImages;
    }
}
