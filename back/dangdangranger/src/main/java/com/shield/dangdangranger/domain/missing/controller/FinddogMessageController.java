package com.shield.dangdangranger.domain.missing.controller;

import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shield.dangdangranger.domain.missing.message.FinddogMessage;
import com.shield.dangdangranger.domain.missing.service.FinddogService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FinddogMessageController {
	
	private static ObjectMapper mapper = new ObjectMapper();

	private final FinddogService finddogService;

	/**
     * websocket "/finddog"으로 들어오는 메시지를 처리한다.
     */
	@MessageMapping("finddog")
	public void message(FinddogMessage message) {
		log.debug(message.toString());
		
		finddogService.publishMessage(message);
	}
}
