package com.shield.dangdangranger.domain.patrol.controller;

import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.*;
import com.shield.dangdangranger.domain.patrol.service.PatrolReportService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.CREATE_PATROL_REPORT_SUCCESS;

@RestController
@RequestMapping("/api/patrol")
@RequiredArgsConstructor
@Slf4j
public class PatrolReportController {

    private final PatrolReportService patrolReportService;

    @PostMapping
    public ResponseEntity<ResponseDto<String>> createPatrolReport(
            @RequestAttribute("userNo") Integer userNo, @RequestBody PatrolReportSaveRequestDto patrolReportSaveRequestDto) {

        patrolReportService.registPatrolReport(userNo, patrolReportSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseDto.create(CREATE_PATROL_REPORT_SUCCESS.message()));
    }

}
