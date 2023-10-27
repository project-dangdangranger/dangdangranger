package com.shield.dangdangranger.domain.user.entity;

import java.util.concurrent.TimeUnit;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(value = "user-info")
public class UserInfo {

    @Id
    private Integer userNo;

    private String userEmail;
    private String userName;
    private String userProfileImg;
    private String userAddress;

    @TimeToLive(unit = TimeUnit.MILLISECONDS)
    private Long ttl;

    @Builder
    UserInfo(Integer userNo, String userEmail, String userName,
        String userProfileImg, Long ttl, String userAddress) {
        this.userNo = userNo;
        this.userEmail = userEmail;
        this.userName = userName;
        this.userProfileImg = userProfileImg;
        this.userAddress = userAddress;
        this.ttl = ttl;
    }

    public void updateUserInfo(User user) {
        this.userName = user.getUserName();
        this.userAddress = user.getDong().getAddress();
        this.userProfileImg = user.getUserProfileImg();
    }

    public void updateUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public void updateUserProfileImg(String userProfileImg) {
        this.userProfileImg = userProfileImg;
    }
}
