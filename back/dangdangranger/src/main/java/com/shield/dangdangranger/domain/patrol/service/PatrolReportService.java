package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.*;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportResponseDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;

import java.util.List;

public interface PatrolReportService {

    public PatrolReport registPatrolReport(Integer userNo, PatrolReportSaveRequestDto patrolReportSaveRequestDto);

    public List<PatrolReportInfoResponseDto> selectAll();

    public List<PatrolReportInfoResponseDto> selectMyAll(Integer userNo);

    public PatrolReportInfoResponseDto selectOnePatrolReport(Integer patrolNo);





}
