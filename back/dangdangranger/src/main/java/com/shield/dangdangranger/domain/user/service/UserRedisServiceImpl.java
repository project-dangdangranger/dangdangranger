package com.shield.dangdangranger.domain.user.service;

import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;

import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.entity.UserInfo;
import com.shield.dangdangranger.domain.user.repo.UserRedisRepository;
import com.shield.dangdangranger.global.error.NotFoundException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserRedisServiceImpl implements UserRedisService {

    @Value("${spring.redis.ttls.user-info}")
    private Long USER_INFO_TTL;

    private final UserRedisRepository userRedisRepository;

    @Override
    public void insertUserInfoToRedis(User user) {
        String key = user.getUserNo() + ":user-info";
        log.debug("[userRedisService - insert] key : {}", key);
        userRedisRepository.save(UserInfo.builder()
            .userNo(user.getUserNo())
            .userEmail(user.getUserEmail())
            .userName(user.getUserName())
            .userProfileImg(user.getUserProfileImg())
            .ttl(USER_INFO_TTL)
            .userAddress(user.getDong().getAddress())
            .dongCode(user.getDong().getDongCode())
            .build()
        );
    }

    @Override
    public UserInfo readUserInfoFromRedis(Integer userNo) {
        return userRedisRepository.findById(userNo).orElseThrow(
            () -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message())
        );
    }

    @Override
    public void deleteUserInfoFromRedis(Integer userNo) {
        userRedisRepository.deleteById(userNo);
    }

    @Override
    public void updateUserInfoToRedis(User user) {
        Optional<UserInfo> userInfoOptional = userRedisRepository.findById(user.getUserNo());
        if (userInfoOptional.isPresent()) {
            UserInfo userInfo = userInfoOptional.get();
            userInfo.updateUserInfo(user);
            userRedisRepository.save(userInfo);
        } else {
            userRedisRepository.save(UserInfo.builder()
                .userNo(user.getUserNo())
                .userEmail(user.getUserEmail())
                .userName(user.getUserName())
                .userProfileImg(user.getUserProfileImg())
                .userAddress(user.getDong().getAddress())
                .dongCode(user.getDong().getDongCode())
                .build()
            );
        }
    }
}
