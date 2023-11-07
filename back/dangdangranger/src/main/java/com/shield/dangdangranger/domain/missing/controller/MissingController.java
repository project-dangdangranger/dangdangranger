package com.shield.dangdangranger.domain.missing.controller;

import static com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage.GET_LOCAL_MISSING_COUNT_SUCCESS;
import static com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage.CREATE_MISSING_SUCCESS;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingSaveRequestDto;
import com.shield.dangdangranger.domain.missing.service.MissingService;
import com.shield.dangdangranger.global.dto.ResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/missing")
@RequiredArgsConstructor
@Slf4j
public class MissingController {

	private final MissingService missingService;

	@GetMapping("/count")
	public ResponseEntity<ResponseDto<Integer>> getLocalMissingDogCount(@RequestAttribute("userNo") Integer userNo) {
		return ResponseEntity.status(HttpStatus.OK).body(ResponseDto
				.create(GET_LOCAL_MISSING_COUNT_SUCCESS.message(), missingService.getLocalMissingDogCount(userNo)));
	}
	
	@PostMapping()
	public ResponseEntity<ResponseDto<String>> createMissing(
			@RequestAttribute("userNo") Integer userNo,
			@RequestBody MissingSaveRequestDto missingSaveRequestDto) {
		
		missingService.registMissing(userNo, missingSaveRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseDto
				.create(CREATE_MISSING_SUCCESS.message()));
	}
}
