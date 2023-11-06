package com.shield.dangdangranger.domain.patrol.repo.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.patrol.entity.QPatrolLog;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PatrolLogRepositoryCustomImpl implements PatrolLogRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<PatrolLog> findAllPatrolLogByUser(Integer userNo, Integer isCanceled) {
        QPatrolLog qPatrolLog = QPatrolLog.patrolLog;

        return jpaQueryFactory
            .selectFrom(qPatrolLog)
            .where(qPatrolLog.user.userNo.eq(userNo)
                .and(qPatrolLog.canceled.eq(isCanceled)))
            .orderBy(qPatrolLog.createDate.desc())
            .fetch();
    }
}
