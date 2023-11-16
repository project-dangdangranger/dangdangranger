package com.shield.dangdangranger.domain.missing.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MissingResponseDto {
	
	@Getter
    @AllArgsConstructor
    @Builder
    public static class MissingSaveResponseDto {
		private Integer missingNo;
	}

	@Getter
    @AllArgsConstructor
    @Builder
    public static class MissingInfoResponseDto {
		private String userName;
		private Integer missingNo;
        private Integer missingTypeNo;
        @Setter
        private Integer dogNo;
        private String missingTitle;
        private String missingContent;
        private LocalDateTime missingDate;
        private Double missingLat;
        private Double missingLng;
        @Setter
        private String topicId;
        private String missingAddress;
        private List<String> missingImages;
	}
	
	@Getter
    @AllArgsConstructor
    @Builder
    public static class MissingListInfoResponseDto {
        private Integer missingNo;
        private Integer missingTypeNo;
        private String missingTitle;
        private LocalDateTime missingDate;
        private Double missingLat;
        private Double missingLng;
        private String thumbnailUrl;
        private String missingAddress;
        private Integer dogNo;
    }
}
