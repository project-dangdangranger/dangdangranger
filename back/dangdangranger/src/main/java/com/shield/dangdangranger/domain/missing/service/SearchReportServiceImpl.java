package com.shield.dangdangranger.domain.missing.service;

import static com.shield.dangdangranger.global.constant.BaseConstant.CANCELED;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shield.dangdangranger.domain.Image.constant.ImageType;
import com.shield.dangdangranger.domain.Image.entity.Image;
import com.shield.dangdangranger.domain.Image.repo.ImageRepository;
import com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage;
import com.shield.dangdangranger.domain.missing.constant.SeachReportResponseMessage;
import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportListRequestDto;
import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportSaveRequestDto;
import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportUpdateRequestDto;
import com.shield.dangdangranger.domain.missing.dto.SearchReportResponseDto.SearchReportInfoResponseDto;
import com.shield.dangdangranger.domain.missing.entity.SearchReport;
import com.shield.dangdangranger.domain.missing.repo.MissingRepository;
import com.shield.dangdangranger.domain.missing.repo.SearchReportRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.error.ForbiddenException;
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
		
		// 실종견 발견 사진 등록
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

	@Override
	public List<SearchReportInfoResponseDto> selectAll(Integer missingNo) {
		
		List<SearchReport> list = searchReportRepository.findAllByMissingNoAndCanceled(
				missingNo, 
				BaseConstant.NOTCANCELED);
		
		List<SearchReportInfoResponseDto> responseDtoList = new ArrayList<>();
		for (SearchReport searchReport : list) {
			responseDtoList.add(SearchReportInfoResponseDto.builder()
					.searchReportNo(searchReport.getSearchReportNo())
					.missingNo(searchReport.getMissingNo())
					.userNo(searchReport.getUserNo())
					.searchReportLat(searchReport.getSearchReportLat())
					.searchReportLng(searchReport.getSearchReportLng())
					.build()
			);
		}
		
		return responseDtoList;
		
	}

	@Override
	public SearchReportInfoResponseDto selectOne(Integer searchReportNo) {
		
		SearchReport searchReport = searchReportRepository.findOneBySearchReportNoAndCanceled(searchReportNo, BaseConstant.NOTCANCELED)
				.orElseThrow(() -> new NotFoundException(
						SeachReportResponseMessage.SEARCH_REPORT_NOT_FOUND_EXCEPTION.message()));
		
		List<String> imageUrls = new ArrayList<>();
		
		imageRepository.findAllByImageTypeNoAndParentNoAndCanceled(
				ImageType.FOUND.value(), searchReportNo, BaseConstant.NOTCANCELED).forEach((image) -> {
					imageUrls.add(image.getImageUrl());
				});;
		
		return SearchReportInfoResponseDto.builder()
				.searchReportNo(searchReport.getSearchReportNo())
				.missingNo(searchReport.getMissingNo())
				.userNo(searchReport.getUserNo())
				.searchReportLat(searchReport.getSearchReportLat())
				.searchReportLng(searchReport.getSearchReportLng())
				.searchReportImages(imageUrls)
				.build();
	}

	@Override
	@Transactional
	public void updateSearchReport(Integer userNo, SearchReportUpdateRequestDto searchReportUpdateRequestDto) {
		
		SearchReport searchReport = searchReportRepository.findOneBySearchReportNoAndCanceled(
				searchReportUpdateRequestDto.getSearchReportNo(), BaseConstant.NOTCANCELED)
				.orElseThrow(() -> new NotFoundException(
						SeachReportResponseMessage.SEARCH_REPORT_NOT_FOUND_EXCEPTION.message()));
		
		if (!searchReport.getUserNo().equals(userNo)) throw new ForbiddenException(
				SeachReportResponseMessage.SEARCH_REPORT_FORBIDDEN_EXCEPTION.message());
		
		Integer searchReportNo = searchReportUpdateRequestDto.getSearchReportNo();
		
		searchReport.updateSearchReport(searchReportUpdateRequestDto);
		List<Image> originImageList = imageRepository.findAllByImageTypeNoAndParentNoAndCanceled(
				ImageType.FOUND.value(), searchReportNo, NOTCANCELED);
		for (Image image : originImageList) {
			image.setCanceled(CANCELED);
			imageRepository.save(image);
		}
		
		List<String> updatedImageList = searchReportUpdateRequestDto.getSearchReportImages();
		for (String newUrl : updatedImageList) {
			imageRepository.save(
					Image.builder()
						.imageTypeNo(ImageType.FOUND.value())
						.imageUrl(newUrl)
						.parentNo(searchReportNo)
						.build());
		}
		searchReportRepository.save(searchReport);
	}

	@Override
	public void deleteSearchReport(Integer userNo, Integer searchReportNo) {
		
		SearchReport searchReport = searchReportRepository.findOneBySearchReportNoAndCanceled(
				searchReportNo, BaseConstant.NOTCANCELED)
				.orElseThrow(() -> new NotFoundException(
						SeachReportResponseMessage.SEARCH_REPORT_NOT_FOUND_EXCEPTION.message()));
		
		if (!searchReport.getUserNo().equals(userNo)) throw new ForbiddenException(
				SeachReportResponseMessage.SEARCH_REPORT_FORBIDDEN_EXCEPTION.message());
		
		searchReport.setCanceled(BaseConstant.CANCELED);
		
		// 이미지 리스트 삭제
        List<Image> list = imageRepository.findAllByImageTypeNoAndParentNoAndCanceled(
        		ImageType.FOUND.value(), searchReportNo, NOTCANCELED);
        for(Image image : list){
            image.setCanceled(CANCELED);
            imageRepository.save(image);
        }
        searchReportRepository.save(searchReport);
	}

}
