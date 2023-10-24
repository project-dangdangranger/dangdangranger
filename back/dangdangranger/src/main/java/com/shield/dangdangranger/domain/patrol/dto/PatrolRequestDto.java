package com.shield.dangdangranger.domain.patrol.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class PatrolRequestDto {
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatrolLogRequestDto {
        private String dongCode;
        private LocalDateTime patrolLogDate;
        private Double patrolLogTotalDistance;
        private Integer patrolLogTotalTime;
        private String patrolLogImageUrl;
        private Double patrolLogLat;
        private Double patrolLogLng;
    }
}
