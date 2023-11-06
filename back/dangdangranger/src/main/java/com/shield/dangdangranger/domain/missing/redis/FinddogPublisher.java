package com.shield.dangdangranger.domain.missing.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import com.shield.dangdangranger.domain.missing.message.FinddogMessage;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FinddogPublisher {
	private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, FinddogMessage message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
}
