package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.*;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportResponseDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;

import java.util.List;

public interface PatrolReportService {

    public PatrolReport registPatrolReport(Integer userNo, PatrolReportSaveRequestDto patrolReportSaveRequestDto);

    public List<PatrolListInfoResponseDto> selectRegionAll(Integer userNo);

    public List<PatrolListInfoResponseDto> selectMyAll(Integer userNo);

    public PatrolReportInfoResponseDto selectOnePatrolReport(Integer patrolNo);

    public void updatePatrolReport(PatrolReportUpdateRequestDto patrolReportUpdateRequestDto);

    public void deletePatrolReport(Integer patrolNo);

    public List<PatrolListInfoResponseDto> searchByTitle(Integer userNo, String keyword);

    public List<PatrolListInfoResponseDto> searchByContent(Integer userNo, String keyword);





}
