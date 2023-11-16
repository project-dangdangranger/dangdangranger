package com.shield.dangdangranger.domain.badge.service;

import com.shield.dangdangranger.domain.badge.constant.BadgeResponseMessage;
import com.shield.dangdangranger.domain.badge.dto.BadgeResponseDto.*;
import com.shield.dangdangranger.domain.badge.entity.Badge;
import com.shield.dangdangranger.domain.badge.entity.UserBadge;
import com.shield.dangdangranger.domain.badge.repo.BadgeRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BadgeServiceImpl implements BadgeService {
    private final BadgeRepository badgeRepository;
    @Override
    public List<UserBadgeListResponseDto> getUserBadgeList(Integer userNo) {
        List<UserBadge> userBadgeList = badgeRepository.findAllByUserNoAndCanceled(userNo, BaseConstant.NOTCANCELED);
        return userBadgeList.stream()
                .map(UserBadgeListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public UserBadgeInfoResponseDto getUserBadgeInfo(Integer userBadgeNo) {
        UserBadge userBadge = badgeRepository.findUserBadgeByUserBadgeNoAndCanceled(userBadgeNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(BadgeResponseMessage.BADGE_INFO_READ_FAIL.getMessage()));
        Badge badge = userBadge.getBadge();
        return UserBadgeInfoResponseDto.builder()
                .userBadgeNo(userBadge.getUserBadgeNo())
                .userBadgeName(badge.getBadgeName())
                .userBadgeDesc(badge.getBadgeDesc())
                .userBadgeImage((userBadge.getUserBadgeCompleted() == BaseConstant.NOTCOMPLETED)
                ? badge.getBadgeUncompleteImageUrl() : badge.getBadgeCompleteImageUrl())
                .userBadgeCompletedDate(userBadge.getUserBadgeCompletedDate()).build();
    }
}
