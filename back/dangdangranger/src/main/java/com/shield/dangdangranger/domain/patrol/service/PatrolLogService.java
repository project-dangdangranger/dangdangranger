package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolLogRequestDto.PatrolLogSaveRequestDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolLogResponseDto.PatrolLogDetailInfoResponseDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolLogResponseDto.PatrolLogRoughInfoResponseDto;
import java.util.List;

public interface PatrolLogService {
    void createPatrolLog(Integer userNo, PatrolLogSaveRequestDto patrolLogSaveRequestDto);
    List<PatrolLogRoughInfoResponseDto> readAllPatrolLog(Integer userNo);
    PatrolLogDetailInfoResponseDto readOnePatrolLog(Integer userNo, Integer patrolLogNo);
}
