package com.shield.dangdangranger.domain.missing.redis;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shield.dangdangranger.domain.missing.message.FinddogMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class FinddogSubscriber implements MessageListener {

	private final ObjectMapper objectMapper;
    private final RedisTemplate<?, ?> redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리한다.
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
    	log.debug("FinddogSubscriber.onMessage : message - {}", message);
        try {
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            
            FinddogMessage finddogMessage = objectMapper.readValue(publishMessage, FinddogMessage.class);
            // Websocket 구독자에게 메시지 Send
            messagingTemplate.convertAndSend("/sub/finddog/" + finddogMessage.getTopicId(), finddogMessage);
            log.debug("convertAndSend - {}", "/sub/finddog/" + finddogMessage.getTopicId());
            
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
