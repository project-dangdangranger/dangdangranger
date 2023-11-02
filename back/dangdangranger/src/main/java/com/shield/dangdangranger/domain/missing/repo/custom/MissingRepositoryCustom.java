package com.shield.dangdangranger.domain.missing.repo.custom;


public interface MissingRepositoryCustom {

	/**
	 * 해당 지역에 있는 실종견 수 조회
	 * 
	 * @param userNo
	 */
	long countByDongCode(Integer userNo);
}
