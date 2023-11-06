package com.shield.dangdangranger.domain.missing.service;

import com.shield.dangdangranger.domain.missing.dto.FinddogResponseDto.FinddogSessionResponseDto;

public interface FinddogService {

	FinddogSessionResponseDto createSession(Integer missingNo);
	
	void connectSession();
	
	void disconnectSession();
	
	void closeSession();
	
	void publishMessage();
}
