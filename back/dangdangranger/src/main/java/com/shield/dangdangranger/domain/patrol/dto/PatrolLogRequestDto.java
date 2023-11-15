package com.shield.dangdangranger.domain.patrol.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class PatrolLogRequestDto {
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatrolLogSaveRequestDto {
        private String postalCode;
        private String address;
        private LocalDateTime patrolLogDate;
        private Double patrolLogTotalDistance;
        private Integer patrolLogTotalTime;
        private String patrolLogImageUrl;
        private Double patrolLogLat;
        private Double patrolLogLng;
    }
}
