package com.shield.dangdangranger.domain.patrol.controller;

import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.*;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportResponseDto.*;
import com.shield.dangdangranger.domain.patrol.service.PatrolReportService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.*;

@RestController
@RequestMapping("/api/patrol")
@RequiredArgsConstructor
@Slf4j
public class PatrolReportController {

    private final PatrolReportService patrolReportService;

    @PostMapping()
    public ResponseEntity<ResponseDto<String>> createPatrolReport(
            @RequestAttribute("userNo") Integer userNo, @RequestBody PatrolReportSaveRequestDto patrolReportSaveRequestDto) {

        patrolReportService.registPatrolReport(userNo, patrolReportSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseDto.create(CREATE_PATROL_REPORT_SUCCESS.message()));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<List<PatrolListInfoResponseDto>>> selectAllPatrolReport (
            @RequestAttribute("userNo") Integer userNo
    ) {
        List<PatrolListInfoResponseDto> patrolReportInfoList = patrolReportService.selectRegionAll(userNo);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(READ_ALL_PATROL_REPORT.message(), patrolReportInfoList));
    }

    @GetMapping("/mine")
    public ResponseEntity<ResponseDto<List<PatrolListInfoResponseDto>>> selectMyAllPatrolReport (
            @RequestAttribute("userNo") Integer userNo) {
        List<PatrolListInfoResponseDto> patrolReportInfoList = patrolReportService.selectMyAll(userNo);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(READ_MY_PATROL_REPORT.message(), patrolReportInfoList));
    }

    @GetMapping("/{patrolNo}")
    public ResponseEntity<ResponseDto<PatrolReportInfoResponseDto>> selectOnePatrolReport(
            @PathVariable Integer patrolNo){
        PatrolReportInfoResponseDto patrolInfo = patrolReportService.selectOnePatrolReport(patrolNo);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(READ_ONE_PATROL_REPORT.message(), patrolInfo));
    }

    @PutMapping()
    public ResponseEntity<ResponseDto<String>> updatePatrolReport (
            @RequestBody PatrolReportUpdateRequestDto patrolReportUpdateRequestDto ) {
        patrolReportService.updatePatrolReport(patrolReportUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(PATROL_REPORT_UPDATE_SUCCESS.message()));
    }



}
