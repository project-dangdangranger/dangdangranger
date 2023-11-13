package com.shield.dangdangranger.domain.missing.service;

import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportSaveRequestDto;
import com.shield.dangdangranger.domain.missing.entity.SearchReport;

public interface SearchReportService {

	SearchReport registSearchReport(Integer userNo, SearchReportSaveRequestDto searchReportSaveRequestDto);

}
