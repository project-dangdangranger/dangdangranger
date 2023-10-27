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
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.PATROL_REPORT_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolReportServiceImpl implements PatrolReportService {

    private final PatrolReportRepository patrolReportRepository;
    private final PatrolLogRepository patrolLogRepository;

    @Override
    public PatrolReport registPatrolReport(Integer userNo, PatrolReportSaveRequestDto patrolReportSaveRequestDto) {
        PatrolLog patrolLog = patrolLogRepository
                .findPatrolLogByPatrolLogNoAndCanceled(patrolReportSaveRequestDto.getPatrolLogNo(), NOTCANCELED)
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
        List<PatrolReport> reportList = patrolReportRepository.findAllByCanceledOrderByCreateDateDesc(NOTCANCELED);

//        return reportList.stream()
//                .map(PatrolReportInfoResponseDto::new)
//                .collect(Collectors.toList());
        return null;
    }

    @Override
    public List<PatrolReportInfoResponseDto> selectMyAll(Integer userNo) {
        List<PatrolReport> reportList = patrolReportRepository
                .findAllByUserNoAndCanceledOrderByCreateDateDesc(userNo, NOTCANCELED);

//        return reportList.stream()
//                .map(PatrolReportInfoResponseDto::new)
//                .collect(Collectors.toList());
        return null;
    }

    @Override
    public PatrolReportInfoResponseDto selectOnePatrolReport(Integer patrolNo) {
        PatrolReport infoResponseDto = patrolReportRepository
                .findPatrolReportByPatrolReportNoAndCanceled(patrolNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_REPORT_NOT_FOUND_EXCEPTION.message()));

        PatrolLog patrolLog = infoResponseDto.getPatrolLog();

//        return PatrolReportInfoResponseDto.builder()
//                .patrolReportNo(infoResponseDto.getPatrolReportNo())
//                .patrolReportTitle(infoResponseDto.getPatrolReportTitle())
//                .patrolReportContent(infoResponseDto.getPatrolReportContent())
//                .patrolReportHit(infoResponseDto.getPatrolReportHit())
//                .userNo(infoResponseDto.getUserNo())
//                .patrolLogNo(patrolLog.getPatrolLogNo())
//                .dong(patrolLog.getDong())
//                .patrolLogDate(patrolLog.getPatrolLogDate())
//                .patrolLogTotalDistance(patrolLog.getPatrolLogTotalDistance())
//                .patrolLogTotalTime(patrolLog.getPatrolLogTotalTime())
//                .patrolLogLat(patrolLog.getPatrolLogLat())
//                .patrolLogLng(patrolLog.getPatrolLogLng())
//                .patrolLogImageUrl(patrolLog.getPatrolLogImageUrl())
//                .patrolWritten(patrolLog.getPatrolWritten())
//                .build();
        return null;
    }
}
