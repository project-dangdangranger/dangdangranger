package com.shield.dangdangranger.domain.patrol.repo.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.patrol.entity.QPatrolLog;
import com.shield.dangdangranger.domain.patrol.entity.QPatrolReport;
import com.shield.dangdangranger.domain.user.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class PatrolReportRepositoryImpl implements PatrolReportRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<PatrolReport> findAllByUserDongCodeAndCanceld(Integer userNo, Integer isCanceled) {
        QPatrolReport qPatrolReport = QPatrolReport.patrolReport;
        QPatrolLog qPatrolLog = QPatrolLog.patrolLog;
        QUser qUser = QUser.user;

        List<PatrolReport> list = queryFactory
                .selectFrom(qPatrolReport)
                .join(qPatrolReport.patrolLog, qPatrolLog)
                .join(qPatrolLog.user, qUser)
                .where(qUser.userNo.eq(userNo)
                        .and(qPatrolLog.dong.eq(qUser.dong))
                        .and(qPatrolLog.canceled.eq(0))
                        .and(qPatrolReport.canceled.eq(0))
                )
                .orderBy(qPatrolReport.createDate.desc())
                .fetch();

        return list;
    }

    @Override
    public List<PatrolReport> findAllByUserDongCodeAndPatrolReportTitleContainingAndCanceled(
            Integer userNo, String keyword, Integer isCanceled) {
        QPatrolReport qPatrolReport = QPatrolReport.patrolReport;
        QPatrolLog qPatrolLog = QPatrolLog.patrolLog;
        QUser qUser = QUser.user;

        List<PatrolReport> list = queryFactory
                .selectFrom(qPatrolReport)
                .join(qPatrolReport.patrolLog, qPatrolLog)
                .join(qPatrolLog.user, qUser)
                .where(qUser.userNo.eq(userNo)
                        .and(qPatrolLog.dong.eq(qUser.dong))
                        .and(qPatrolReport.patrolReportTitle.contains(keyword))
                        .and(qPatrolLog.canceled.eq(0))
                        .and(qPatrolReport.canceled.eq(0))
                )
                .orderBy(qPatrolReport.createDate.desc())
                .fetch();

        return list;
    }


}
