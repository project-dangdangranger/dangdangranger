package com.shield.dangdangranger.domain.patrol.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class PatrolCommentRequestDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RegistRequestDto{
        private Integer patrolNo;
        private String patrolCommentContent;
    }
}
