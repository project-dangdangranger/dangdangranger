package com.shield.dangdangranger.domain.patrol.dto;

import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.region.entity.Dong;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class PatrolLogResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class PatrolLogDetailInfoResponseDto {
        private Integer patrolLogNo;
        private String patrolLogAddress;
        private String patrolLogImageUrl;
        private LocalDateTime patrolLogDate;
        private Double patrolLogTotalDistance;
        private Integer patrolLogTotalTime;

        @Builder
        public PatrolLogDetailInfoResponseDto(PatrolLog patrolLog) {
            this.patrolLogNo = patrolLog.getPatrolLogNo();
            this.patrolLogAddress = patrolLog.getDong().getAddress();
            this.patrolLogImageUrl = patrolLog.getPatrolLogImageUrl();
            this.patrolLogDate = patrolLog.getPatrolLogDate();
            this.patrolLogTotalDistance = patrolLog.getPatrolLogTotalDistance();
            this.patrolLogTotalTime = patrolLog.getPatrolLogTotalTime();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class PatrolLogRoughInfoResponseDto {
        private Integer patrolLogNo;
        private String patrolLogAddress;
        private String patrolLogImageUrl;
        private LocalDateTime patrolLogDate;

        public PatrolLogRoughInfoResponseDto(PatrolLog patrolLog) {
            this.patrolLogNo = patrolLog.getPatrolLogNo();
            this.patrolLogAddress = patrolLog.getDong().getAddress();
            this.patrolLogImageUrl = patrolLog.getPatrolLogImageUrl();
            this.patrolLogDate = patrolLog.getPatrolLogDate();
        }
    }
}
