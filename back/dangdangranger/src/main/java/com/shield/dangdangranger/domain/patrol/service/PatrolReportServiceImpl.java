package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.patrol.repo.PatrolReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolReportServiceImpl implements PatrolReportService{

    private final PatrolReportRepository patrolReportRepository;

    @Override
    public PatrolReport registPatrolReport(Integer userNo, PatrolReportSaveRequestDto patrolReportSaveRequestDto) {
        PatrolReport patrolReport = PatrolReport.builder()
                .userNo(userNo)
                .patrolLogNo(patrolReportSaveRequestDto.getPatrolLogNo())
                .patrolReportTitle(patrolReportSaveRequestDto.getPatrolReportTitle())
                .patrolReportContent(patrolReportSaveRequestDto.getPatrolReportContent())
                .patrolReportHit(patrolReportSaveRequestDto.getPatrolReportHit())
                .build();

        patrolReportRepository.save(patrolReport);

        return patrolReport;
    }
}
