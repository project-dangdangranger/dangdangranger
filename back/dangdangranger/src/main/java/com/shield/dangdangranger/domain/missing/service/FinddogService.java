package com.shield.dangdangranger.domain.missing.service;

public interface FinddogService {

	void openSession(Integer missingNo);
	
	void connectSession();
	
	void disconnectSession();
	
	void closeSession();
	
	void publishMessage();
}
