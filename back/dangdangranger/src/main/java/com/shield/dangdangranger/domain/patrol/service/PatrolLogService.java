package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolRequestDto.PatrolLogRequestDto;

public interface PatrolLogService {
    void createPatrolLog(Integer userNo, PatrolLogRequestDto patrolLogRequestDto);
}
