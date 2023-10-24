package com.shield.dangdangranger.domain.patrol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

public class PatrolReportRequestDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PatrolReportSaveRequestDto {
        private Integer patrolReportNo;
        private Integer patrolLogNo;
        private String patrolReportTitle;
        private String patrolReportContent;
        private Integer patrolReportHit;
    }

}
