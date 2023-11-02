package com.shield.dangdangranger.domain.missing.repo.custom;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shield.dangdangranger.domain.missing.entity.QMissing;
import com.shield.dangdangranger.domain.user.entity.QUser;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MissingRepositoryImpl implements MissingRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    
	@Override
	public long countByDongCode(Integer userNo) {
		QMissing m = QMissing.missing;
		QUser u = QUser.user;

		// 서브쿼리 작성
		SubQueryExpression<String> subQuery = JPAExpressions
		    .select(u.dong.dongCode)
		    .from(u)
		    .where(u.userNo.eq(userNo)); // user_no 값에 따라서 서브쿼리의 결과를 필터링

		// 메인 쿼리 작성
		Long result = queryFactory.select(m.count())
		    .from(m)
		    .join(u).on(m.user.userNo.eq(u.userNo))
		    .where(
		        u.dong.dongCode.eq(subQuery),
		        m.missingType.missingTypeNo.eq(1),
		        m.missingStatus.eq(0),
		        m.canceled.eq(0)
		    )
		    .fetchOne();
		
		return result;
	}

}
