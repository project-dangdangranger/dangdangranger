package com.shield.dangdangranger.domain.patrol.service;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolWritten.NOT_WRITTEN;
import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

import com.shield.dangdangranger.domain.patrol.dto.PatrolRequestDto.PatrolLogRequestDto;
import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.patrol.repo.PatrolLogRepository;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolLogServiceImpl implements PatrolLogService {

    private final PatrolLogRepository patrolLogRepository;
    private final UserRepository userRepository;

    @Override
    public void createPatrolLog(Integer userNo, PatrolLogRequestDto patrolLogRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        // TODO : dong code 설정

        patrolLogRepository.save(PatrolLog.builder()
            .patrolLogDate(patrolLogRequestDto.getPatrolLogDate())
            .patrolRecordTotalTime(patrolLogRequestDto.getPatrolLogTotalTime())
            .patrolLogLat(patrolLogRequestDto.getPatrolLogLat())
            .patrolLogLng(patrolLogRequestDto.getPatrolLogLng())
            .patrolLogImageUrl(patrolLogRequestDto.getPatrolLogImageUrl())
            .patrolWritten(NOT_WRITTEN.value())
            .build());
    }
}
