package com.shield.dangdangranger.domain.patrol.service;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolWritten.NOT_WRITTEN;
import static com.shield.dangdangranger.domain.region.constant.RegionErrorMessage.DONG_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

import com.shield.dangdangranger.domain.patrol.dto.PatrolLogRequestDto.PatrolLogSaveRequestDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolLogResponseDto.PatrolLogRoughInfoResponseDto;
import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.patrol.repo.PatrolLogRepository;
import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.repo.DongRepository;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.error.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolLogServiceImpl implements PatrolLogService {

    private final PatrolLogRepository patrolLogRepository;
    private final UserRepository userRepository;
    private final DongRepository dongRepository;

    @Override
    public void createPatrolLog(Integer userNo, PatrolLogSaveRequestDto patrolLogSaveRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
        Dong dong = dongRepository.findDongByDongCodeAndCanceled(patrolLogSaveRequestDto.getDong(), NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(DONG_NOT_FOUND_EXCEPTION.message()));

        patrolLogRepository.save(PatrolLog.builder()
            .user(user)
            .dong(dong)
            .patrolLogDate(patrolLogSaveRequestDto.getPatrolLogDate())
            .patrolLogTotalDistance(patrolLogSaveRequestDto.getPatrolLogTotalDistance())
            .patrolLogTotalTime(patrolLogSaveRequestDto.getPatrolLogTotalTime())
            .patrolLogImageUrl(patrolLogSaveRequestDto.getPatrolLogImageUrl())
            .patrolLogLat(patrolLogSaveRequestDto.getPatrolLogLat())
            .patrolLogLng(patrolLogSaveRequestDto.getPatrolLogLng())
            .patrolWritten(NOT_WRITTEN.value())
            .build());
    }

    @Override
    public List<PatrolLogRoughInfoResponseDto> readAllPatrolLog() {
        return null;
    }
}
