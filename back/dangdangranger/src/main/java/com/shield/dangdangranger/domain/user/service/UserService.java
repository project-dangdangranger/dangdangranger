package com.shield.dangdangranger.domain.user.service;

import com.shield.dangdangranger.domain.user.dto.TokenInfo;
import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UpdateUserInfoRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UpdateUserMessageRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserResponseDto.AccessTokenResponseDto;
import com.shield.dangdangranger.domain.user.dto.UserResponseDto.UserInfoResponseDto;

public interface UserService {

    TokenInfo signUpOrIn(UserInfoRequestDto userInfoRequestDto);

    UserInfoResponseDto getUserInfo(Integer userNo);

    void deleteUser(Integer userNo);

    AccessTokenResponseDto reissueAccessToken(Integer userNo);

    void updateUserName(Integer userNo, UpdateUserInfoRequestDto updateUserInfoRequestDto);
}
