package com.shield.dangdangranger.domain.missing.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportListRequestDto;
import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportSaveRequestDto;
import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportUpdateRequestDto;
import com.shield.dangdangranger.domain.missing.dto.SearchReportResponseDto.SearchReportInfoResponseDto;
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
	
	// 실종견 신고 조회
	@GetMapping()
	public ResponseEntity<ResponseDto<List<SearchReportInfoResponseDto>>> getSearchReportList(
			@RequestParam Integer missingNo) {
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(ResponseDto
						.create(SeachReportResponseMessage.GET_SEARCH_REPORT_LIST_SUCCESS.message(),
								searchReportService.selectAll(missingNo)));
	}
	
	// 실종견 신고 조회
	@GetMapping("/{searchReportNo}")
	public ResponseEntity<ResponseDto<SearchReportInfoResponseDto>> getSearchReportDetail(
			@PathVariable Integer searchReportNo) {
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(ResponseDto
						.create(SeachReportResponseMessage.GET_SEARCH_REPORT_SUCCESS.message(),
								searchReportService.selectOne(searchReportNo)));
	}

	// 실종견 신고 수정
	@PutMapping()
	public ResponseEntity<ResponseDto<String>> updateSearchReport(
			@RequestAttribute("userNo") Integer userNo,
			@RequestBody SearchReportUpdateRequestDto searchReportUpdateRequestDto) {
		
		searchReportService.updateSearchReport(userNo, searchReportUpdateRequestDto);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(ResponseDto.create(SeachReportResponseMessage.UPDATE_SUCCESS.message()));
	}
	
	// 실종견 신고 삭제
	@DeleteMapping("/{searchReportNo}")
	public ResponseEntity<ResponseDto<String>> deleteMissing(
			@RequestAttribute("userNo") Integer userNo,
			@PathVariable Integer searchReportNo) {
		
		searchReportService.deleteSearchReport(userNo, searchReportNo);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(ResponseDto.create(SeachReportResponseMessage.DELETE_SUCCESS.message()));
	}
}
