package com.shield.dangdangranger.domain.user.dto;

import com.shield.dangdangranger.domain.user.constant.UserRole;
import com.shield.dangdangranger.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class UserRequestDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserInfoRequestDto {

        private String userEmail;
        private String userName;
        private String userProfileImg;
        private UserRole userRole;

        public User toUser() {
            return User.builder()
                .userEmail(userEmail)
                .userName(userName)
                .userProfileImg(userProfileImg)
                .userRole(userRole)
                .build();
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserInfoRequestDto {

        private String userName;
        private String userDong;
        private String userProfileImg;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserRefreshTokenDto {

        private String refreshToken;
    }
}
