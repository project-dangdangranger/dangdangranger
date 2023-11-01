package com.shield.dangdangranger.domain.user.service;

import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UpdateUserInfoRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UserWalletPwRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UserWalletRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserResponseDto.AccessTokenResponseDto;
import com.shield.dangdangranger.domain.user.dto.UserResponseDto.SignResponseDto;
import com.shield.dangdangranger.domain.user.dto.UserResponseDto.UserInfoResponseDto;

public interface UserService {

    SignResponseDto signUpOrIn(UserInfoRequestDto userInfoRequestDto);

    UserInfoResponseDto getUserInfo(Integer userNo);

    void deleteUser(Integer userNo);

    AccessTokenResponseDto reissueAccessToken(Integer userNo);

    void updateUserInfo(Integer userNo, UpdateUserInfoRequestDto updateUserInfoRequestDto);

    void updateUserWallet(Integer userNo, UserWalletRequestDto userWalletRequestDto);

    void checkUserWalletPw(Integer userNo, UserWalletPwRequestDto userWalletPwRequestDto);
}
