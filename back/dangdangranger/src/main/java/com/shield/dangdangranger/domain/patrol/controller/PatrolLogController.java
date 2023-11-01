package com.shield.dangdangranger.domain.patrol.controller;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogResponseMessage.CREATE_PATROL_LOG_SUCCESS;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogResponseMessage.READ_ALL_PATROL_LOG_SUCCESS;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogResponseMessage.READ_ONE_PATROL_LOG_SUCCESS;

import com.shield.dangdangranger.domain.patrol.dto.PatrolLogRequestDto.PatrolLogSaveRequestDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolLogResponseDto.PatrolLogDetailInfoResponseDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolLogResponseDto.PatrolLogRoughInfoResponseDto;
import com.shield.dangdangranger.domain.patrol.service.PatrolLogService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/log")
@RequiredArgsConstructor
@Slf4j
public class PatrolLogController {

    private final PatrolLogService patrolLogService;

    @PostMapping
    public ResponseEntity<ResponseDto<String>> createPatrolLog(
        @RequestAttribute("userNo") Integer userNo,
        @RequestBody PatrolLogSaveRequestDto patrolLogSaveRequestDto) {
        patrolLogService.createPatrolLog(userNo, patrolLogSaveRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResponseDto.create(CREATE_PATROL_LOG_SUCCESS.message()));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<List<PatrolLogRoughInfoResponseDto>>> readAllPatrolLog() {
        return ResponseEntity.status(HttpStatus.OK)
            .body(ResponseDto.create(READ_ALL_PATROL_LOG_SUCCESS.message(), patrolLogService.readAllPatrolLog()));
    }

    @GetMapping("/{patrolLogNo}")
    public ResponseEntity<ResponseDto<PatrolLogDetailInfoResponseDto>> readOnePatrolLog(
        @RequestAttribute("userNo") Integer userNo,
        @PathVariable("patrolLogNo") Integer patrolLogNo) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(ResponseDto.create(READ_ONE_PATROL_LOG_SUCCESS.message(), patrolLogService.readOnePatrolLog(userNo, patrolLogNo)));
    }
}
