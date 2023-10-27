package com.shield.dangdangranger.domain.patrol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;
import java.util.List;

public class PatrolReportRequestDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PatrolReportSaveRequestDto {
        private String patrolReportTitle;
        private String patrolReportContent;
        private List<String> patrolReportImageList;
        private Integer patrolLogNo;
    }

}
