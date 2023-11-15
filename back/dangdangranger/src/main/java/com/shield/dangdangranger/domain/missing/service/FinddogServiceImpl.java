package com.shield.dangdangranger.domain.missing.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import com.shield.dangdangranger.domain.missing.dto.FinddogResponseDto.FinddogSessionResponseDto;
import com.shield.dangdangranger.domain.missing.entity.Missing;
import com.shield.dangdangranger.domain.missing.message.FinddogMessage;
import com.shield.dangdangranger.domain.missing.message.FinddogMessage.Code;
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
	
	private final Map<Integer, String> topicNames = new HashMap<>();
	private final Map<String, ChannelTopic> topics = new HashMap<>();
	private final RedisMessageListenerContainer redisMessageListener;
	private final FinddogPublisher finddogPublisher;
	private final FinddogSubscriber finddogSubscriber;
	
	private final MissingRepository missingRepository;
	
	private int participants = 0;
	private Map<Integer, Integer> topicParticipants = new HashMap<>();

	@Override
	public FinddogSessionResponseDto createSession(Integer missingNo) {
		log.debug("FinddogServiceImpl.createSession : missingNo - {}", missingNo);
		Missing missing = missingRepository.findByMissingNoAndCanceled(missingNo, BaseConstant.NOTCANCELED)
			.orElseThrow(() -> new ForbiddenException("존재하지 않는 실종견입니다."));

		String topicName = topicNames.get(missing.getMissingNo());
		ChannelTopic topic = topics.get(topicName);
		if (topicName != null && topic != null) 
			return FinddogSessionResponseDto.builder().topicId(topic.getTopic()).build();

		topicName = UUID.randomUUID().toString();
		topic = new ChannelTopic(topicName);
		topicNames.put(missingNo, topicName);
		topicParticipants.put(missingNo, 0);
		topics.put(topicName, topic);
		redisMessageListener.addMessageListener(finddogSubscriber, topic);
		log.debug("FinddogServiceImpl.createSession : 세션 생성됨 topicName - {}", topicName);
		
		return FinddogSessionResponseDto.builder().topicId(topicName).build();
	}

	@Override
	public void publishMessage(FinddogMessage message) {
		ChannelTopic topic = topics.get(message.getTopicId());
		
		finddogPublisher.publish(topic, message);
	}

	@Override
	public String getFinddogTopicId(Integer missingNo) {
		
		return topicNames.get(missingNo);
	}

	public int getFinddogParticipants() {
		return participants;
	}

	private synchronized void setFinddogParticipants(int finddogParticipants) {
		this.participants = finddogParticipants;
	}

	@Override
	public void increaseFinddogParticipants(Integer missingNo) {
		topicParticipants.put(missingNo, topicParticipants.get(missingNo) + 1);
		setFinddogParticipants(getFinddogParticipants() + 1);
	}

	@Override
	public void decreaseFinddogParticipants(Integer missingNo) {
		topicParticipants.put(missingNo, topicParticipants.get(missingNo) - 1);
		setFinddogParticipants(getFinddogParticipants() - 1);
	}

	@Override
	public void endSession(FinddogMessage message) {
		setFinddogParticipants(getFinddogParticipants() - topicParticipants.get(message.getMissingNo()));
		
		topicNames.put(message.getMissingNo(), null);
		topics.put(message.getTopicId(), null);
		topicParticipants.put(message.getMissingNo(), null);
	}

	@Override
	public void closeSession(Integer missingNo) {
		String topicName = topicNames.get(missingNo);
		if (topicName == null) return;
		
		publishMessage(FinddogMessage
				.builder()
				.code(Code.END_SESSION)
				.missingNo(missingNo)
				.topicId(topicName)
				.build());
		
		setFinddogParticipants(getFinddogParticipants() - topicParticipants.get(missingNo));
		
		topicNames.put(missingNo, null);
		topicParticipants.put(missingNo, null);
		topics.put(topicName, null);
	}

}
