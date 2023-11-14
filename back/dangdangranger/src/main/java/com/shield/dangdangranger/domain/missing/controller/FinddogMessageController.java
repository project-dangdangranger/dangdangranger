package com.shield.dangdangranger.domain.missing.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.shield.dangdangranger.domain.missing.message.FinddogMessage;
import com.shield.dangdangranger.domain.missing.message.FinddogMessage.Code;
import com.shield.dangdangranger.domain.missing.service.FinddogService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class FinddogMessageController {
	
	private final FinddogService finddogService;

	/**
     * websocket "/finddog"으로 들어오는 메시지를 처리한다.
     */
	@MessageMapping("finddog")
	public void message(FinddogMessage message) {
		log.debug(message.toString());
		
		switch (message.getCode()) {
		case ENTER:
			finddogService.increaseFinddogParticipants(message.getMissingNo());
			break;
		case EXIT:
			finddogService.decreaseFinddogParticipants(message.getMissingNo());
			break;
		default:
			break;
		}
		
		finddogService.publishMessage(message);
	}
}
