package com.shield.dangdangranger.domain.patrol.controller;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogResponseMessage.ADD_PATROL_PERSON_SUCCESS;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogResponseMessage.READ_PATROL_PEOPLE_CNT;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.CREATE_PATROL_REPORT_SUCCESS;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.PATROL_REPORT_DELETE_SUCCESS;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.PATROL_REPORT_UPDATE_SUCCESS;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.READ_ALL_PATROL_REPORT;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.READ_MY_PATROL_REPORT;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.READ_ONE_PATROL_REPORT;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.SEARCH_BY_CONTENT_SUCCESS;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.SEARCH_BY_TITLE_AND_CONTENT_SUCCESS;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.SEARCH_BY_TITLE_SUCCESS;

import com.shield.dangdangranger.domain.patrol.dto.PatrolLogResponseDto.PatrolPeopleCntResponseDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.PatrolReportSaveRequestDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.PatrolReportUpdateRequestDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportResponseDto.PatrolListInfoResponseDto;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportResponseDto.PatrolReportInfoResponseDto;
import com.shield.dangdangranger.domain.patrol.service.PatrolLogService;
import com.shield.dangdangranger.domain.patrol.service.PatrolReportService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patrol")
@RequiredArgsConstructor
@Slf4j
public class PatrolReportController {

    private final PatrolReportService patrolReportService;
    private final PatrolLogService patrolLogService;

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

    @DeleteMapping("/{patrolNo}")
    public ResponseEntity<ResponseDto<String>> deletePatrolReport(
            @PathVariable Integer patrolNo ) {
        patrolReportService.deletePatrolReport(patrolNo);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(PATROL_REPORT_DELETE_SUCCESS.message()));
    }

    @GetMapping("/title/{keyword}")
    public ResponseEntity<ResponseDto<List<PatrolListInfoResponseDto>>> searchByTitle(
            @RequestAttribute("userNo") Integer userNo, @PathVariable String keyword ) {
        List<PatrolListInfoResponseDto> patrolReportInfoList = patrolReportService.searchByTitle(userNo, keyword);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(SEARCH_BY_TITLE_SUCCESS.message(), patrolReportInfoList));
    }

    @GetMapping("/content/{keyword}")
    public ResponseEntity<ResponseDto<List<PatrolListInfoResponseDto>>> searchByContent(
            @RequestAttribute("userNo") Integer userNo, @PathVariable String keyword ) {
        List<PatrolListInfoResponseDto> patrolReportInfoList = patrolReportService.searchByContent(userNo, keyword);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(SEARCH_BY_CONTENT_SUCCESS.message(), patrolReportInfoList));
    }

    @GetMapping("/titlencontent/{keyword}")
    public ResponseEntity<ResponseDto<List<PatrolListInfoResponseDto>>> searchByTitleAndContent(
            @RequestAttribute("userNo") Integer userNo, @PathVariable String keyword ) {
        List<PatrolListInfoResponseDto> patrolReportInfoList = patrolReportService.searchByTitleAndContent(userNo, keyword);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(SEARCH_BY_TITLE_AND_CONTENT_SUCCESS.message(), patrolReportInfoList));
    }

    @PostMapping("/start")
    public ResponseEntity<ResponseDto<String>> addPatrolPerson() {
        patrolLogService.addPatrolPerson();
        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseDto.create(ADD_PATROL_PERSON_SUCCESS.message()));
    }

    @GetMapping("/people")
    public ResponseEntity<ResponseDto<PatrolPeopleCntResponseDto>> readPatrolPeopleCnt() {
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDto.create(READ_PATROL_PEOPLE_CNT.message(),
            patrolLogService.readPatrolPeopleCnt()));
    }
}
