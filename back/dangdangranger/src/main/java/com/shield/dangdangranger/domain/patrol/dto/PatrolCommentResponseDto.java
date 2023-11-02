package com.shield.dangdangranger.domain.patrol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class PatrolCommentResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class CommentInfoResponseDto {
        private Integer patrolCommentNo;
        private String userName;
        private String patrolCommentContent;
        private LocalDateTime createDate;

    }
}
