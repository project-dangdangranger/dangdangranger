package com.shield.dangdangranger.domain.missing.repo.custom;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.SubQueryExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shield.dangdangranger.domain.missing.entity.Missing;
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

		// 메인 쿼리 작성
		Long result = queryFactory.select(m.count())
		    .from(m)
		    .join(u).on(m.userNo.eq(u.userNo))
		    .where(
		        u.dong.dongCode.eq(getUserDongCodeSubQuery(userNo)),
		        m.missingStatus.eq(0),
		        m.canceled.eq(0)
		    )
		    .fetchOne();
		
		return result;
	}

	@Override
	public List<Missing> findAllByDongCode(Integer userNo) {
		
		return null;
	}

	// 사용자의 동네코드를 가져오는 서브쿼리
	private SubQueryExpression<String> getUserDongCodeSubQuery(Integer userNo) {
		QUser u = QUser.user;
		
		return JPAExpressions
		    .select(u.dong.dongCode)
		    .from(u)
		    .where(u.userNo.eq(userNo)); // user_no 값에 따라서 서브쿼리의 결과를 필터링
	}
}
