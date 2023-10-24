package com.shield.dangdangranger.domain.badge.controller;

import com.shield.dangdangranger.domain.badge.constant.BadgeResponseMessage;
import com.shield.dangdangranger.domain.badge.dto.BadgeResponseDto.*;
import com.shield.dangdangranger.domain.badge.service.BadgeService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/userbadge")
public class BadgeController {
    private final BadgeService badgeService;

    @GetMapping()
    public ResponseEntity<ResponseDto<List<UserBadgeListResponseDto>>> getUserBadgeList(@RequestAttribute("userNo") Integer userNo){
        List<UserBadgeListResponseDto> list = badgeService.getUserBadgeList(userNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(BadgeResponseMessage.BADGE_LIST_READ_SUCCESS.getMessage(), list));
    }

    @GetMapping("/{userBadgeNo}")
    public ResponseEntity<ResponseDto<UserBadgeInfoResponseDto>> getUserBadgeInfo(@PathVariable Integer userBadgeNo){
        UserBadgeInfoResponseDto userBadgeInfoResponseDto = badgeService.getUserBadgeInfo(userBadgeNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(BadgeResponseMessage.BADGE_INFO_READ_SUCCESS.getMessage(), userBadgeInfoResponseDto));
    }
}
