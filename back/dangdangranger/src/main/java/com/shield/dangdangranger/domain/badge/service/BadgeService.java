package com.shield.dangdangranger.domain.badge.service;

import com.shield.dangdangranger.domain.badge.dto.BadgeResponseDto.*;

import java.util.List;

public interface BadgeService {
    List<UserBadgeListResponseDto> getUserBadgeList(Integer userNo);

    UserBadgeInfoResponseDto getUserBadgeInfo(Integer userBadgeNo);
}
