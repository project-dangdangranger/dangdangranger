package com.shield.dangdangranger.global.util.oauth;

import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class OAuth2UserInfo {

    private String userEmail;
    private String userName;
    private String userProfileImg;

    @Builder
    public OAuth2UserInfo(Map<String, Object> userAttribute) {
        this.userEmail = (String) userAttribute.get("email");
        this.userName = (String) userAttribute.get("name");
        this.userProfileImg = (String) userAttribute.get("picture");
    }
}
