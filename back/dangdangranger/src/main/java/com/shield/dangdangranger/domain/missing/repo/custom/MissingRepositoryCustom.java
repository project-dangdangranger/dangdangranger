package com.shield.dangdangranger.domain.missing.repo.custom;

import java.util.List;

import com.shield.dangdangranger.domain.missing.entity.Missing;

public interface MissingRepositoryCustom {

	/**
	 * 해당 지역에 있는 실종견 수 조회
	 * 
	 * @param userNo
	 */
	long countByDongCode(Integer userNo);
	
	/**
	 * 삭제, 해결되지 않은 동네 실종견 조회
	 * @param userNo
	 * @return List<Missing>
	 */
	List<Missing> findAllByDongCode(Integer userNo);
}
