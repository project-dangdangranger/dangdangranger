package com.shield.dangdangranger.domain.missing.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shield.dangdangranger.domain.missing.constant.FinddogResponseMessage;
import com.shield.dangdangranger.domain.missing.dto.FinddogRequestDto.FinddogCreateRequestDto;
import com.shield.dangdangranger.domain.missing.dto.FinddogResponseDto.FinddogParticipantsCountResponseDto;
import com.shield.dangdangranger.domain.missing.service.FinddogService;
import com.shield.dangdangranger.global.dto.ResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/finddog")
public class FinddogController {

	private final FinddogService finddogService;
	
	@PostMapping()
	public ResponseEntity<ResponseDto<?>> createSession(
			@RequestAttribute("userNo") Integer userNo,
			@RequestBody FinddogCreateRequestDto finddogCreateRequestDto) {
		log.debug("FinddogController.createSession : userNo - {}, finddogCreateRequestDto - {}"
				, userNo, finddogCreateRequestDto);
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(
					ResponseDto.create(
						FinddogResponseMessage.CREATE_SESSION_SUCCESS.message(), 
						finddogService.createSession(finddogCreateRequestDto.getMissingNo())
					)
				);
	}

	@GetMapping("/participants_count")
	public ResponseEntity<ResponseDto<FinddogParticipantsCountResponseDto>> getFinddogParticipantsCount() {
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(
					ResponseDto.create(
						FinddogResponseMessage.GET_FINDDOG_PARTICIPANTS_COUNT_SUCCESS.message(), 
						FinddogParticipantsCountResponseDto
							.builder()
							.participantsCount(finddogService.getFinddogParticipants())
							.build()
					)
				);
	}
}
