package com.shield.dangdangranger.domain.patrol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class PatrolReportResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class PatrolReportInfoResponseDto {
        private Integer patrolReportNo;
        private Integer userNo;
        private Integer patrolLogNo;
        private String patrolReportTitle;
        private String patrolReportContent;
        private Integer patrolReportHit;
    }


}
