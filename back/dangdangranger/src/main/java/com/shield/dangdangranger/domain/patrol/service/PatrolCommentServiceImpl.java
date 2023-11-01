package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolCommentRequestDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolComment;
import com.shield.dangdangranger.domain.patrol.repo.PatrolCommentRepository;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolCommentServiceImpl implements PatrolCommentService{

    private final UserRepository userRepository;
    private final PatrolCommentRepository patrolCommentRepository;

    @Override
    public PatrolComment registPatrolComment(Integer userNo, RegistRequestDto registRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        PatrolComment patrolComment = PatrolComment.builder()
                .patrolNo(registRequestDto.getPatrolNo())
                .user(user)
                .patrolCommentContent(registRequestDto.getPatrolCommentContent())
                .build();
        patrolCommentRepository.save(patrolComment);

        return patrolComment;
    }
}
