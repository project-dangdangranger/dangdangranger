package com.shield.dangdangranger.domain.missing.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import com.shield.dangdangranger.domain.missing.redis.FinddogPublisher;
import com.shield.dangdangranger.domain.missing.redis.FinddogSubscriber;
import com.shield.dangdangranger.domain.missing.repo.MissingRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.error.ForbiddenException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class FinddogServiceImpl implements FinddogService {
	
	private Map<String, ChannelTopic> topics = new HashMap<>();
	private RedisMessageListenerContainer redisMessageListener;
	private FinddogPublisher finddogPublisher;
	private FinddogSubscriber finddogSubscriber;
	
	private MissingRepository missingRepository;

	@Override
	public void openSession(Integer missingNo) {
		missingRepository.findByMissingNoAndCanceled(missingNo, BaseConstant.NOTCANCELED)
			.orElseThrow(() -> new ForbiddenException(""));

        String uuid = UUID.randomUUID().toString();
	}

	@Override
	public void connectSession() {
		// TODO Auto-generated method stub

	}

	@Override
	public void disconnectSession() {
		// TODO Auto-generated method stub

	}

	@Override
	public void closeSession() {
		// TODO Auto-generated method stub

	}

	@Override
	public void publishMessage() {
		// TODO Auto-generated method stub

	}

}
