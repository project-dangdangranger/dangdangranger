package com.shield.dangdangranger.domain.patrol.repo.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportResponseDto;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.patrol.entity.QPatrolLog;
import com.shield.dangdangranger.domain.patrol.entity.QPatrolReport;
import com.shield.dangdangranger.domain.patrol.repo.PatrolLogRepository;
import com.shield.dangdangranger.domain.region.entity.QDong;
import com.shield.dangdangranger.domain.user.entity.QUser;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

@Repository
@RequiredArgsConstructor
public class PatrolReportRepositoryImpl implements PatrolReportRepositoryCustom{

    private final UserRepository userRepository;
    private final PatrolLogRepository patrolLogRepository;
    private final JPAQueryFactory queryFactory;

    @Override
    public List<PatrolReport> findAllByUserDongCodeAndCanceld(String userDong, Integer isCanceled) {
        QPatrolReport qPatrolReport = QPatrolReport.patrolReport;
        QPatrolLog qPatrolLog = QPatrolLog.patrolLog;
        QUser qUser = QUser.user;
        QDong qDong = QDong.dong;

        List<PatrolReport> list = queryFactory
                .selectFrom(qPatrolReport)
                .join(qPatrolReport.patrolLog, qPatrolLog)
                .join(qPatrolLog.user, qUser)
                .where(qPatrolReport.userNo.eq(qUser.userNo)
                        .and(qPatrolLog.dong.dongCode.eq(userDong))
                        .and(qPatrolLog.canceled.eq(0))
                )
                .orderBy(qPatrolReport.createDate.desc())
                .fetch();

        return list;
    }


}
