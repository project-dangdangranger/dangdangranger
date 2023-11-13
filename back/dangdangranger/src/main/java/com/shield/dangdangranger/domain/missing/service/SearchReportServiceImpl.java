package com.shield.dangdangranger.domain.missing.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shield.dangdangranger.domain.Image.constant.ImageType;
import com.shield.dangdangranger.domain.Image.entity.Image;
import com.shield.dangdangranger.domain.Image.repo.ImageRepository;
import com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage;
import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportSaveRequestDto;
import com.shield.dangdangranger.domain.missing.entity.SearchReport;
import com.shield.dangdangranger.domain.missing.repo.MissingRepository;
import com.shield.dangdangranger.domain.missing.repo.SearchReportRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.error.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SearchReportServiceImpl implements SearchReportService {

	private final SearchReportRepository searchReportRepository;
	
	private final MissingRepository missingRepository;
	
	private final ImageRepository imageRepository;
	
	@Override
	@Transactional
	public SearchReport registSearchReport(
			Integer userNo,
			SearchReportSaveRequestDto searchReportSaveRequestDto) {
		
		missingRepository.findByMissingNoAndCanceled(searchReportSaveRequestDto.getMissingNo(), BaseConstant.NOTCANCELED)
			.orElseThrow(() -> new NotFoundException(MissingResponseMessage.MISSING_NOT_FOUND.message()));
		
		SearchReport searchReport = SearchReport.builder()
				.missingNo(searchReportSaveRequestDto.getMissingNo())
				.userNo(userNo)
				.searchReportContent(searchReportSaveRequestDto.getSearchReportContent())
				.searchReportLat(searchReportSaveRequestDto.getSearchReportLat())
				.searchReportLng(searchReportSaveRequestDto.getSearchReportLng())
				.build();

		searchReportRepository.save(searchReport);
		Integer searchReportNo = searchReport.getSearchReportNo();
		
		// 실종견 사진 등록
		List<String> searchReportImageList = searchReportSaveRequestDto.getSearchReportImages();
        for (int i = 0; i < searchReportImageList.size(); i++) {
            Image image = Image.builder()
                    .imageTypeNo(ImageType.FOUND.value())
                    .parentNo(searchReportNo)
                    .imageUrl(searchReportImageList.get(i))
                    .build();
            imageRepository.save(image);
        }

        return searchReport;
	}

}
