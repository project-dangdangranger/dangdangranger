package com.shield.dangdangranger.domain.patrol.dto;

import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.patrol.dto.PatrolCommentResponseDto.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
        private final String userProfileImg;
        //순찰로그 정보
//        private final Integer patrolLogNo;
        private final String patrolLogAddress;
        private final LocalDateTime patrolLogDate;
        private final Double patrolLogTotalDistance;
        private final Integer patrolLogTotalTime;
        private final Double patrolLogLat;
        private final Double patrolLogLng;
        private final String patrolLogImageUrl;
        private final List<String> patrolReportImages;
        private final List<CommentInfoResponseDto> patrolComments;

        public PatrolReportInfoResponseDto(PatrolReport patrolReport, String userName, String userProfileImg, List<PatrolCommentResponseDto.CommentInfoResponseDto> patrolComments) {
            this.patrolReportNo = patrolReport.getPatrolReportNo();
            this.patrolReportTitle = patrolReport.getPatrolReportTitle();
            this.patrolReportContent = patrolReport.getPatrolReportContent();
            this.patrolReportHit = patrolReport.getPatrolReportHit();
            //사용자 이름
            this.userName = userName;
            this.userProfileImg = userProfileImg;
            //순찰로그 정보
            PatrolLog patrolLog = patrolReport.getPatrolLog();
            this.patrolLogDate = patrolLog.getPatrolLogDate();
            this.patrolLogAddress = patrolLog.getDong().getAddress();
            this.patrolLogTotalDistance = patrolLog.getPatrolLogTotalDistance();
            this.patrolLogTotalTime = patrolLog.getPatrolLogTotalTime();
            this.patrolLogLat = patrolLog.getPatrolLogLat();
            this.patrolLogLng = patrolLog.getPatrolLogLng();
            this.patrolLogImageUrl = patrolLog.getPatrolLogImageUrl();
            //순찰일지 이미지리스트 초기화
            this.patrolReportImages = new ArrayList<>();
            //순찰일지 댓글리스트
            this.patrolComments = patrolComments;
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class PatrolListInfoResponseDto {
        private Integer patrolNo;
        private String patrolTitle;
        private String patrolLogAddress;
        private LocalDateTime patrolDate;
        private String userName;
        private String patrolFirstImg;
        private Integer patrolHit;

    }


}
