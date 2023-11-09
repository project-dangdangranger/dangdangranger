package com.shield.dangdangranger.domain.missing.controller;

import static com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage.GET_LOCAL_MISSING_COUNT_SUCCESS;
import static com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage.CREATE_MISSING_SUCCESS;
import static com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage.READ_ALL_MISSING;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage;
import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingSaveRequestDto;
import com.shield.dangdangranger.domain.missing.dto.MissingResponseDto.MissingInfoResponseDto;
import com.shield.dangdangranger.domain.missing.dto.MissingResponseDto.MissingListInfoResponseDto;
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

	/**
	 * 지역 실종견 수 조회 api
	 * @param userNo
	 * @return
	 */
	@GetMapping("/count")
	public ResponseEntity<ResponseDto<Integer>> getLocalMissingDogCount(@RequestAttribute("userNo") Integer userNo) {
		return ResponseEntity.status(HttpStatus.OK).body(ResponseDto
				.create(GET_LOCAL_MISSING_COUNT_SUCCESS.message(), missingService.getLocalMissingDogCount(userNo)));
	}
	
	/**
	 * 실종견 등록 api
	 * @param userNo
	 * @param missingSaveRequestDto
	 * @return
	 */
	@PostMapping()
	public ResponseEntity<ResponseDto<String>> createMissing(
			@RequestAttribute("userNo") Integer userNo,
			@RequestBody MissingSaveRequestDto missingSaveRequestDto) {
		
		missingService.registMissing(userNo, missingSaveRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseDto
				.create(CREATE_MISSING_SUCCESS.message()));
	}
	
	/**
	 * 실종견 리스트 조회 api
	 * @param userNo
	 * @return
	 */
	@GetMapping()
	public ResponseEntity<ResponseDto<List<MissingListInfoResponseDto>>> getMissingList(
			@RequestAttribute("userNo") Integer userNo) {
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(ResponseDto.create(READ_ALL_MISSING.message()
						, missingService.selectAll(userNo)));
	}
	
	/**
	 * 실종견 상세조회 api
	 * @param userNo
	 * @return
	 */
	@GetMapping("/{missingNo}")
	public ResponseEntity<ResponseDto<MissingInfoResponseDto>> getMissingInfo(
			@PathVariable Integer missingNo) {
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(ResponseDto.create(MissingResponseMessage.GET_MISSING_SUCCESS.message()
						, missingService.selectOne(missingNo)));
	}
}
