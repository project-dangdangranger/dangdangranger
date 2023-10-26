package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.*;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportResponseDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.patrol.repo.PatrolLogRepository;
import com.shield.dangdangranger.domain.patrol.repo.PatrolReportRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.entity.BaseEntity;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogResponseMessage.PATROL_LOG_NOT_FOUND_EXCEPTION;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolReportServiceImpl implements PatrolReportService{

    private final PatrolReportRepository patrolReportRepository;
    private final PatrolLogRepository patrolLogRepository;

    @Override
    public PatrolReport registPatrolReport(Integer userNo, PatrolReportSaveRequestDto patrolReportSaveRequestDto) {
        PatrolLog patrolLog = patrolLogRepository.findPatrolLogByPatrolLogNoAndCanceled(patrolReportSaveRequestDto.getPatrolLogNo(), BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_LOG_NOT_FOUND_EXCEPTION.message()));

        PatrolReport patrolReport = PatrolReport.builder()
                .userNo(userNo)
                .patrolReportTitle(patrolReportSaveRequestDto.getPatrolReportTitle())
                .patrolReportContent(patrolReportSaveRequestDto.getPatrolReportContent())
                .patrolReportHit(patrolReportSaveRequestDto.getPatrolReportHit())
                .patrolLog(patrolLog)
                .build();

        patrolReportRepository.save(patrolReport);

        return patrolReport;
    }

    @Override
    public List<PatrolReportInfoResponseDto> selectAll() {
        List<PatrolReport> reportList = patrolReportRepository.findAllByCanceledOrderByCreateDateDesc(BaseConstant.NOTCANCELED);

        return reportList.stream()
                .map(PatrolReportInfoResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<PatrolReportInfoResponseDto> selectMyAll(Integer userNo) {
        List<PatrolReport> reportList = patrolReportRepository.findAllByUserNoAndCanceledOrderByCreateDateDesc(userNo, BaseConstant.NOTCANCELED);

        return reportList.stream()
                .map(PatrolReportInfoResponseDto::new)
                .collect(Collectors.toList());
    }
}
