package com.shield.dangdangranger.domain.patrol.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolRedisServiceImpl implements PatrolRedisService{

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void addPatrolPersonInRedis() {
        String patrolKey = "patrol_people_cnt";
        redisTemplate.opsForValue().increment(patrolKey, 1);
    }

    @Override
    public void deletePatrolPersonInRedis() {
        String patrolKey = "patrol_people_cnt";
        redisTemplate.opsForValue().decrement(patrolKey, 1);
    }

    @Override
    public int readPatrolPeopleCntFromRedis() {
        String patrolKey = "patrol_people_cnt";
        return (int) redisTemplate.opsForValue().get(patrolKey);
    }
}
