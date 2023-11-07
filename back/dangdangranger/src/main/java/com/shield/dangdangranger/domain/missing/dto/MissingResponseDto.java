package com.shield.dangdangranger.domain.missing.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class MissingResponseDto {

	
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
        
    }
}
