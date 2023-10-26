package com.shield.dangdangranger.domain.patrol.dto;

import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.region.entity.Dong;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class PatrolReportResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class PatrolReportInfoResponseDto {
        private final Integer patrolReportNo;
        private final String patrolReportTitle;
        private final String patrolReportContent;
        private final Integer patrolReportHit;
        //사용자 정보
        private final String userName;
        //순찰로그 정보
//        private final Integer patrolLogNo;
        private final Dong dong;
        private final LocalDateTime patrolLogDate;
        private final Double patrolLogTotalDistance;
        private final Integer patrolLogTotalTime;
        private final Double patrolLogLat;
        private final Double patrolLogLng;
        private final String patrolLogImageUrl;
        private final Integer patrolWritten;

        public PatrolReportInfoResponseDto(PatrolReport patrolReport, String userName) {
            this.patrolReportNo = patrolReport.getPatrolReportNo();
            this.patrolReportTitle = patrolReport.getPatrolReportTitle();
            this.patrolReportContent = patrolReport.getPatrolReportContent();
            this.patrolReportHit = patrolReport.getPatrolReportHit();
            //사용자 이름
            this.userName = userName;
            //순찰로그 정보
            PatrolLog patrolLog = patrolReport.getPatrolLog();
            this.patrolLogDate = patrolLog.getPatrolLogDate();
            this.dong = patrolLog.getDong();
            this.patrolLogTotalDistance = patrolLog.getPatrolLogTotalDistance();
            this.patrolLogTotalTime = patrolLog.getPatrolLogTotalTime();
            this.patrolLogLat = patrolLog.getPatrolLogLat();
            this.patrolLogLng = patrolLog.getPatrolLogLng();
            this.patrolLogImageUrl = patrolLog.getPatrolLogImageUrl();
            this.patrolWritten = patrolLog.getPatrolWritten();

        }
    }


}
