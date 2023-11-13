package com.shield.dangdangranger.domain.missing.service;

import java.util.List;

import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportListRequestDto;
import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportSaveRequestDto;
import com.shield.dangdangranger.domain.missing.entity.SearchReport;

public interface SearchReportService {

	// 실종견 발견 신고 등록
	SearchReport registSearchReport(Integer userNo, SearchReportSaveRequestDto searchReportSaveRequestDto);

	// 실종견 발견 신고 리스트 조회
	List<SearchReport> selectAll(SearchReportListRequestDto searchReportListRequestDto);
	
	// 실종견 발견 신고 상세 조회
	SearchReport selectOne(Integer searchReportNo);
}
