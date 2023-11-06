package com.shield.dangdangranger.domain.missing.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shield.dangdangranger.domain.missing.constant.FinddogResponseMessage;
import com.shield.dangdangranger.domain.missing.dto.FinddogRequestDto.FinddogCreateRequestDto;
import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingSaveRequestDto;
import com.shield.dangdangranger.domain.missing.message.FinddogMessage;
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
		log.debug("FinddogController.createSession : userNo - {}, finddogCreateRequestDto - {}", userNo, finddogCreateRequestDto);
		
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(
					ResponseDto.create(
						FinddogResponseMessage.CREATE_SESSION_SUCCESS.message(), 
						finddogService.createSession(finddogCreateRequestDto.getMissingNo())
					)
				);
	}

}
