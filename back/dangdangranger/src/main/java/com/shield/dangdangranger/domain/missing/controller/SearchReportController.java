package com.shield.dangdangranger.domain.missing.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportSaveRequestDto;
import com.shield.dangdangranger.domain.missing.dto.SearchReportResponseDto.SearchReportSaveResponseDto;
import com.shield.dangdangranger.domain.missing.entity.SearchReport;
import com.shield.dangdangranger.domain.missing.service.SearchReportService;
import com.shield.dangdangranger.domain.missing.constant.SeachReportResponseMessage;
import com.shield.dangdangranger.global.dto.ResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/searchreport")
@RequiredArgsConstructor
@Slf4j
public class SearchReportController {
	
	private final SearchReportService searchReportService;
	
	// 발견 신고 등록 api
	@PostMapping()
	public ResponseEntity<ResponseDto<SearchReportSaveResponseDto>> createSearchReport(
			@RequestAttribute("userNo") Integer userNo,
			@RequestBody SearchReportSaveRequestDto searchReportSaveRequestDto) {
		
		SearchReport searchReport = searchReportService.registSearchReport(userNo, searchReportSaveRequestDto);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(ResponseDto
						.create(SeachReportResponseMessage.CREATE_SEARCH_REPORT_SUCCESS.message(), 
								SearchReportSaveResponseDto.builder()
									.searchReportNo(searchReport.getSearchReportNo())
									.build()));
	}

}
