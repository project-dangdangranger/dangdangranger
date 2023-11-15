package com.shield.dangdangranger.domain.missing.service;

import java.util.List;

import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingSaveRequestDto;
import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingUpdateRequestDto;
import com.shield.dangdangranger.domain.missing.dto.MissingResponseDto.MissingInfoResponseDto;
import com.shield.dangdangranger.domain.missing.dto.MissingResponseDto.MissingListInfoResponseDto;
import com.shield.dangdangranger.domain.missing.dto.RecentMissingImageDto;
import com.shield.dangdangranger.domain.missing.entity.Missing;
import com.shield.dangdangranger.domain.user.entity.User;

public interface MissingService {

	/**
	 * 지역 실종견 수 조회
	 * @param userNo
	 * @return
	 */
	int getLocalMissingDogCount(Integer userNo);
	
	// 실종견 게시글 등록
	Missing registMissing(Integer userNo, MissingSaveRequestDto missingSaveRequestDto);
	
	// 동네 실종견 게시글 리스트 조회
	List<MissingListInfoResponseDto> selectAll(Integer userNo);
	
	// 실종견 게시글 상세 조회
	MissingInfoResponseDto selectOne(Integer missingNo);
	
	// 실종견 게시글 수정
	void updateMissing(MissingUpdateRequestDto missingUpdateRequestDto);
	
	// 실종견 완료 처리
	void updateMissingStatus(Integer userNo, Integer missingNo);
	
	// 실종견 삭제
	void deleteMissing(Integer userNo, Integer missingNo);
	
	// 최근 실종견 사진 조회
	List<RecentMissingImageDto> getRecentMissingImages();
}
