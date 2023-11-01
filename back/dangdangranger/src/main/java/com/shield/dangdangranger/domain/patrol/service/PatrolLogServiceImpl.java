package com.shield.dangdangranger.domain.patrol.service;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogExceptionMessage.PATROL_LOG_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolWritten.NOT_WRITTEN;
import static com.shield.dangdangranger.domain.region.constant.RegionErrorMessage.DONG_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;
import static com.shield.dangdangranger.global.constant.BaseConstant.FORBIDDEN_EXCEPTION_MESSAGE;

import com.shield.dangdangranger.domain.patrol.dto.PatrolLogRequestDto.PatrolLogSaveRequestDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolLogResponseDto.PatrolLogDetailInfoResponseDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolLogResponseDto.PatrolLogRoughInfoResponseDto;
import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.patrol.repo.PatrolLogRepository;
import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.repo.DongRepository;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.error.ForbiddenException;
import com.shield.dangdangranger.global.error.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PatrolLogServiceImpl implements PatrolLogService {

    private final PatrolLogRepository patrolLogRepository;
    private final UserRepository userRepository;
    private final DongRepository dongRepository;

    @Override
    @Transactional
    public void createPatrolLog(Integer userNo, PatrolLogSaveRequestDto patrolLogSaveRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
        Dong dong = dongRepository.findDongByDongCode(patrolLogSaveRequestDto.getDong())
            .orElseThrow(() -> new NotFoundException(DONG_NOT_FOUND_EXCEPTION.message()));

        log.debug("[createPatrolLog] dong : {}", dong);

        patrolLogRepository.save(PatrolLog.builder()
            .user(user)
            .dong(dong)
            .patrolLogDate(patrolLogSaveRequestDto.getPatrolLogDate())
            .patrolLogTotalDistance(patrolLogSaveRequestDto.getPatrolLogTotalDistance())
            .patrolLogTotalTime(patrolLogSaveRequestDto.getPatrolLogTotalTime())
            .patrolLogImageUrl(patrolLogSaveRequestDto.getPatrolLogImageUrl())
            .patrolLogLat(patrolLogSaveRequestDto.getPatrolLogLat())
            .patrolLogLng(patrolLogSaveRequestDto.getPatrolLogLng())
            .patrolLogWritten(NOT_WRITTEN.value())
            .build());
    }

    @Override
    public List<PatrolLogRoughInfoResponseDto> readAllPatrolLog() {
        // TODO : 사용자 정보 받아와서 해당하는 사용자의 로그만 가져오게 수정
        return patrolLogRepository.findAllByCanceledOrderByCreateDateDesc(NOTCANCELED)
            .stream().map(PatrolLogRoughInfoResponseDto::new).collect(Collectors.toList());
    }

    @Override
    public PatrolLogDetailInfoResponseDto readOnePatrolLog(Integer userNo, Integer patrolLogNo) {
        User loggedInUser = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
        PatrolLog patrolLog = patrolLogRepository.findPatrolLogByPatrolLogNoAndCanceled(patrolLogNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(PATROL_LOG_NOT_FOUND_EXCEPTION.message()));

        if(patrolLog.getUser() != loggedInUser) {
            throw new ForbiddenException(FORBIDDEN_EXCEPTION_MESSAGE);
        }
        return new PatrolLogDetailInfoResponseDto(patrolLog);
    }
}
