package com.shield.dangdangranger.domain.missing.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import com.shield.dangdangranger.domain.missing.dto.FinddogResponseDto;
import com.shield.dangdangranger.domain.missing.dto.FinddogResponseDto.FinddogSessionResponseDto;
import com.shield.dangdangranger.domain.missing.entity.Missing;
import com.shield.dangdangranger.domain.missing.redis.FinddogPublisher;
import com.shield.dangdangranger.domain.missing.redis.FinddogSubscriber;
import com.shield.dangdangranger.domain.missing.repo.MissingRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.error.DuplicatedException;
import com.shield.dangdangranger.global.error.ForbiddenException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class FinddogServiceImpl implements FinddogService {
	
	private final Map<Integer, ChannelTopic> topics = new HashMap<>();
	private final RedisMessageListenerContainer redisMessageListener;
	private final FinddogPublisher finddogPublisher;
	private final FinddogSubscriber finddogSubscriber;
	
	private final MissingRepository missingRepository;

	@Override
	public FinddogSessionResponseDto createSession(Integer missingNo) {
		log.debug("FinddogServiceImpl.createSession : missingNo - {}", missingNo);
		Missing missing = missingRepository.findByMissingNoAndCanceled(missingNo, BaseConstant.NOTCANCELED)
			.orElseThrow(() -> new ForbiddenException("존재하지 않는 실종견입니다."));

		ChannelTopic topic = topics.get(missing.getMissingNo());
		
		if (topic != null) throw new DuplicatedException("이미 함께 찾기 세션이 존재합니다.", FinddogSessionResponseDto.builder().topicNo(topic.getTopic()).build());

		topic = new ChannelTopic(UUID.randomUUID().toString());
		topics.put(missing.getMissingNo(), topic);
		redisMessageListener.addMessageListener(finddogSubscriber, topic);
		
		return FinddogSessionResponseDto.builder().topicNo(topic.getTopic()).build();
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
