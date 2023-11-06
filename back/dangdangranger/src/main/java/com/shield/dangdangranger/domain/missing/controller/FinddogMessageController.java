package com.shield.dangdangranger.domain.missing.controller;

import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shield.dangdangranger.domain.missing.message.FinddogMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FinddogMessageController {
	
	private static ObjectMapper mapper = new ObjectMapper();

	/**
     * websocket "/finddog"으로 들어오는 메시지를 처리한다.
     */
	@MessageMapping("/finddog")
	public void message(FinddogMessage message) {
		log.debug(message.toString());
		
		switch(message.getCode()) {
		case ENTER:
			
			break;
		case EXIT:
			
			break;
		case SHARE_COORDINATE:
			Map<String, Double> coordinate = mapper.convertValue(message.getParam(), Map.class);
			break;
		}
	}
}
