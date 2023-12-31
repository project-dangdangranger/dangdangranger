package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolCommentRequestDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolComment;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.patrol.repo.PatrolCommentRepository;
import com.shield.dangdangranger.domain.patrol.repo.PatrolReportRepository;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolCommentResponseMessage.PATROL_COMMENT_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.PATROL_REPORT_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.CANCELED;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolCommentServiceImpl implements PatrolCommentService{

    private final UserRepository userRepository;
    private final PatrolCommentRepository patrolCommentRepository;
    private final PatrolReportRepository patrolReportRepository;

    @Override
    public PatrolComment registPatrolComment(Integer userNo, RegistRequestDto registRequestDto) {
        User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
        PatrolReport patrolReport = patrolReportRepository.findPatrolReportByPatrolReportNoAndCanceled(
                registRequestDto.getPatrolNo(),NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_REPORT_NOT_FOUND_EXCEPTION.message()));

        PatrolComment patrolComment = PatrolComment.builder()
                .user(user)
                .patrolCommentContent(registRequestDto.getPatrolCommentContent())
                .patrolReport(patrolReport)
                .build();
        patrolCommentRepository.save(patrolComment);

        return patrolComment;
    }

    @Override
    public void updatePatrolComment(UpdateRequestDto updateRequestDto) {
        PatrolComment comment = patrolCommentRepository.findPatrolCommentByPatrolCommentNoAndCanceled(updateRequestDto.getPatrolCommentNo(), NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_COMMENT_NOT_FOUND_EXCEPTION.message()));

        comment.updatePatrolComment(updateRequestDto.getPatrolCommentContent());
        patrolCommentRepository.save(comment);

    }

    @Override
    public void deletePatrolComment(Integer patrolCommentNo) {
        PatrolComment comment = patrolCommentRepository.findPatrolCommentByPatrolCommentNoAndCanceled(patrolCommentNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_COMMENT_NOT_FOUND_EXCEPTION.message()));

        comment.setCanceled(CANCELED);
        patrolCommentRepository.save(comment);

    }

}
