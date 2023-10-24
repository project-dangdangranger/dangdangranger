package com.shield.dangdangranger.domain.patrol.controller;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogResponseMessage.CREATE_PATROL_LOG_SUCCESS;

import com.shield.dangdangranger.domain.patrol.dto.PatrolRequestDto.PatrolLogRequestDto;
import com.shield.dangdangranger.domain.patrol.service.PatrolLogService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        @RequestAttribute("user_no") Integer userNo,
        @RequestBody PatrolLogRequestDto patrolLogRequestDto) {
        patrolLogService.createPatrolLog(userNo, patrolLogRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ResponseDto.create(CREATE_PATROL_LOG_SUCCESS.message()));
    }
}
