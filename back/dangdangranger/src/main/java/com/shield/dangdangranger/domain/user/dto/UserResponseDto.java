package com.shield.dangdangranger.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class UserResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class AccessTokenResponseDto {

        private String accessToken;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserInfoResponseDto {

        private String userEmail;
        private String userName;
        private String userMessage;
        private String userProfileImg;
    }
}
