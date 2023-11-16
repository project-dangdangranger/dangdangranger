package com.shield.dangdangranger.domain.missing.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.shield.dangdangranger.domain.missing.message.FinddogMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Slf4j
public class FinddogPublisher {
	private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, FinddogMessage message) {
    	log.debug("FinddogPublisher.publish : message - {}", message);
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
}
