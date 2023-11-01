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

        private Integer userNo;
        private String userEmail;
        private String userName;
        private String userProfileImg;
        private String userAddress;
        private String userDongCode;
        private String userWalletAddress;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class SignResponseDto {

        private TokenInfo tokenInfo;
        private String signInUp;
    }
}
