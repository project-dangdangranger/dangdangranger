package com.shield.dangdangranger.domain.missing.service;

import com.shield.dangdangranger.domain.missing.dto.FinddogResponseDto.FinddogSessionResponseDto;
import com.shield.dangdangranger.domain.missing.message.FinddogMessage;

public interface FinddogService {

	FinddogSessionResponseDto createSession(Integer missingNo);
	
	void closeSession(Integer missingNo);
	
	void publishMessage(FinddogMessage message);
	
	String getFinddogTopicId(Integer missingNo);
	
	void increaseFinddogParticipants(Integer missingNo);
	
	void decreaseFinddogParticipants(Integer missingNo);
	
	int getFinddogParticipants();

	void endSession(FinddogMessage message);
}
