package com.shield.dangdangranger.domain.user.service;


import static com.shield.dangdangranger.domain.user.constant.SignInUp.SIGN_IN;
import static com.shield.dangdangranger.domain.user.constant.SignInUp.SIGN_UP;
import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.CANCELED;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.repo.DongRepository;
import com.shield.dangdangranger.domain.user.dto.TokenInfo;
import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UpdateUserInfoRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserRequestDto.UserInfoRequestDto;
import com.shield.dangdangranger.domain.user.dto.UserResponseDto.AccessTokenResponseDto;
import com.shield.dangdangranger.domain.user.dto.UserResponseDto.SignResponseDto;
import com.shield.dangdangranger.domain.user.dto.UserResponseDto.UserInfoResponseDto;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.entity.UserInfo;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.error.NotFoundException;
import com.shield.dangdangranger.global.util.jwt.JwtTokenHandler;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenHandler jwtTokenHandler;
    private final UserRedisService userRedisService;
    private final DongRepository dongRepository;


    @Override
    public SignResponseDto signUpOrIn(UserInfoRequestDto userInfoRequestDto) {
        User user = insertUser(userInfoRequestDto.toUser());
        log.debug("[userServiceImpl - signUpOrIn] User : {}", user);

//        userRedisService.insertUserInfoToRedis(user);

        // 토큰 발급 후, 정보 반환
        TokenInfo tokenInfo = jwtTokenHandler.generateToken(user.getUserNo());
        String signInUp = SIGN_UP.message();
        if(user.getDong() != null) {
            signInUp = SIGN_IN.message();
        }
        return SignResponseDto.builder()
            .tokenInfo(tokenInfo)
            .signInUp(signInUp)
            .build();
    }

    @Transactional
    public User insertUser(User user) {
        log.debug("### [DEBUG/UserService] 회원가입 user : {}", user);

        // DB에 정보 없을 경우 회원가입, 있을 경우 프로필 사진/이름 업데이트
        Optional<User> optionalUser = userRepository.findUserByUserEmailAndCanceled(
            user.getUserEmail(),
            NOTCANCELED);
        if (optionalUser.isEmpty()) {
            userRepository.save(user);
        }
        return userRepository.findUserByUserEmailAndCanceled(user.getUserEmail(),
            NOTCANCELED).get();
    }

    @Override
    public UserInfoResponseDto getUserInfo(Integer userNo) {
        try {
            // redis 에서 먼저 검색
            log.debug("[UserService] Get user info from redis !!");
            UserInfo userInfo = userRedisService.readUserInfoFromRedis(userNo);
            return UserInfoResponseDto.builder()
                .userNo(userInfo.getUserNo())
                .userEmail(userInfo.getUserEmail())
                .userName(userInfo.getUserName())
                .userProfileImg(userInfo.getUserProfileImg())
                .userAddress(userInfo.getUserAddress())
                .userDongCode(userInfo.getDongCode())
                .build();
        } catch (NotFoundException e) {
            // 없으면 DB 검색
            log.debug("[UserService] Get user info from DB !!");
            User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

            // redis 에 저장
            userRedisService.insertUserInfoToRedis(user);

            return UserInfoResponseDto.builder()
                .userNo(user.getUserNo())
                .userEmail(user.getUserEmail())
                .userName(user.getUserName())
                .userProfileImg(user.getUserProfileImg())
                .userAddress(user.getDong().getAddress())
                .userDongCode(user.getDong().getDongCode())
                .build();
        }
    }

    @Override
    @Transactional
    public void deleteUser(Integer userNo) {
        // Redis 에서 삭제
        userRedisService.deleteUserInfoFromRedis(userNo);

        // DB 에서 삭제
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        user.setCanceled(CANCELED);
        userRepository.save(user);
    }

    @Override
    public AccessTokenResponseDto reissueAccessToken(Integer userNo) {
        String accessToken = jwtTokenHandler.generateToken(userNo).getAccessToken();

        return AccessTokenResponseDto.builder()
            .accessToken(accessToken)
            .build();
    }

    @Override
    @Transactional
    public void updateUserInfo(Integer userNo, UpdateUserInfoRequestDto updateUserInfoRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
            .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
        log.debug("[userService/updateUserName] update user info : {}",
            updateUserInfoRequestDto.getUserName());

        Dong dong = dongRepository.findDongByDongCode(updateUserInfoRequestDto.getUserDong()).get();
        // TODO : 파라미터 리팩토링 가능하면 할 것
        user.updateUserInfo(updateUserInfoRequestDto.getUserName(),
            dong, updateUserInfoRequestDto.getUserProfileImg());
        userRepository.save(user);

        // redis 에 적용
        userRedisService.updateUserInfoToRedis(user);
    }
}
