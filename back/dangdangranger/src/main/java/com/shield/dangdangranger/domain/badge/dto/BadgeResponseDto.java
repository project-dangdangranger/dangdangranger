package com.shield.dangdangranger.domain.badge.dto;

import com.shield.dangdangranger.domain.badge.entity.Badge;
import com.shield.dangdangranger.domain.badge.entity.UserBadge;
import com.shield.dangdangranger.global.constant.BaseConstant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class BadgeResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserBadgeListResponseDto{
        private Integer userBadgeNo;
        private String userBadgeName;
        private String userBadgeImage;

        public UserBadgeListResponseDto(UserBadge userBadge){
            Badge badge = userBadge.getBadge();
            this.userBadgeNo = userBadge.getUserBadgeNo();
            this.userBadgeName = badge.getBadgeName();
            this.userBadgeImage = (userBadge.getUserBadgeCompleted() == BaseConstant.NOTCOMPLETED)
                    ? badge.getBadgeUncompleteImageUrl()
                    : badge.getBadgeCompleteImageUrl();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserBadgeInfoResponseDto{
        private Integer userBadgeNo;
        private String userBadgeName;
        private String userBadgeDesc;
        private String userBadgeImage;
        private LocalDateTime userBadgeCompletedDate;
    }
}
