package com.shield.dangdangranger.domain.user.service;

import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.entity.UserInfo;

public interface UserRedisService {

    void insertUserInfoToRedis(User user);

    UserInfo readUserInfoFromRedis(Integer userNo);

    void deleteUserInfoFromRedis(Integer userNo);

    void updateUserNameToRedis(User user);
}
