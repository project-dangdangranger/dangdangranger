package com.shield.dangdangranger.domain.missing.service;

import static com.shield.dangdangranger.global.constant.BaseConstant.CANCELED;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shield.dangdangranger.domain.Image.constant.ImageType;
import com.shield.dangdangranger.domain.Image.entity.Image;
import com.shield.dangdangranger.domain.Image.repo.ImageRepository;
import com.shield.dangdangranger.domain.missing.constant.MissingResponseMessage;
import com.shield.dangdangranger.domain.missing.constant.MissingStatus;
import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingSaveRequestDto;
import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingUpdateRequestDto;
import com.shield.dangdangranger.domain.missing.dto.MissingResponseDto.MissingInfoResponseDto;
import com.shield.dangdangranger.domain.missing.dto.MissingResponseDto.MissingListInfoResponseDto;
import com.shield.dangdangranger.domain.missing.dto.RecentMissingImageDto;
import com.shield.dangdangranger.domain.missing.entity.Missing;
import com.shield.dangdangranger.domain.missing.repo.MissingRepository;
import com.shield.dangdangranger.domain.user.constant.UserExceptionMessage;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.error.ForbiddenException;
import com.shield.dangdangranger.global.error.NotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MissingServiceImpl implements MissingService {
	
	private final UserRepository userRepository;
	
	private final MissingRepository missingRepository;
	
	private final ImageRepository imageRepository;
	
	private final FinddogService finddogService;

	@Override
	public int getLocalMissingDogCount(Integer userNo) {
		
		return (int) missingRepository.countByDongCode(userNo);
	}

	@Override
	@Transactional
	public Missing registMissing(Integer userNo, MissingSaveRequestDto missingSaveRequestDto) {
		
		Missing missing = Missing.builder()
				.userNo(userNo)
				.missingTypeNo(missingSaveRequestDto.getMissingTypeNo())
				.missingTitle(missingSaveRequestDto.getMissingTitle())
				.missingContent(missingSaveRequestDto.getMissingContent())
				.missingDate(missingSaveRequestDto.getMissingDate())
				.missingLat(missingSaveRequestDto.getMissingLat())
				.missingLng(missingSaveRequestDto.getMissingLng())
				.missingAddress(missingSaveRequestDto.getMissingAddress())
				.dogNo(missingSaveRequestDto.getDogNo())
				.build();
		
		missingRepository.save(missing);
		Integer missingNo = missing.getMissingNo();
		
		// 실종견 사진 등록
		List<String> missingImageList = missingSaveRequestDto.getMissingImages();
        for (int i = 0; i < missingImageList.size(); i++) {
            Image image = Image.builder()
                    .imageTypeNo(ImageType.MISSING.value())
                    .parentNo(missingNo)
                    .imageUrl(missingImageList.get(i))
                    .build();
            imageRepository.save(image);
        }
		
		return missing;
	}

	@Transactional
	@Override
	public List<MissingListInfoResponseDto> selectAll(Integer userNo) {
		
		List<Missing> missingList = missingRepository.findByMissingStatusAndCanceled(MissingStatus.MISSING.value(), BaseConstant.NOTCANCELED);
		List<MissingListInfoResponseDto> responseList = new ArrayList<>();
		for (Missing missing : missingList) {
			Optional<Image> optionalImage = imageRepository
					.findFirstImageUrlByImageTypeNoAndParentNoAndCanceled(
							ImageType.MISSING.value(), missing.getMissingNo(), NOTCANCELED);
			String imageUrl = null;
			if (optionalImage.isPresent()) imageUrl = optionalImage.get().getImageUrl();
			
			responseList.add(MissingListInfoResponseDto.builder()
					.missingDate(missing.getMissingDate())
					.missingLat(missing.getMissingLat())
					.missingLng(missing.getMissingLng())
					.missingNo(missing.getMissingNo())
					.missingTitle(missing.getMissingTitle())
					.missingTypeNo(missing.getMissingTypeNo())
					.thumbnailUrl(imageUrl)
					.missingAddress(missing.getMissingAddress())
					.dogNo(missing.getDogNo())
					.build());
		}
		
		return responseList;
	}

	@Override
	public MissingInfoResponseDto selectOne(Integer missingNo) {
		Missing missing = missingRepository.findByMissingNoAndCanceled(missingNo, BaseConstant.NOTCANCELED)
				.orElseThrow(() -> new NotFoundException(MissingResponseMessage.MISSING_NOT_FOUND.message()));
		User user = userRepository.findById(missing.getUserNo())
				.orElseThrow(() -> new NotFoundException(UserExceptionMessage.USER_NOT_FOUND_EXCEPTION.message()));
		
		List<String> imageUrls = new ArrayList<>();
		
		imageRepository.findAllByImageTypeNoAndParentNoAndCanceled(
				ImageType.MISSING.value(), missingNo, BaseConstant.NOTCANCELED).forEach((image) -> {
					imageUrls.add(image.getImageUrl());
				});
		
		MissingInfoResponseDto missingInfoResponseDto = MissingInfoResponseDto.builder()
				.userName(user.getUserName())
				.missingNo(missingNo)
				.missingTypeNo(missing.getMissingTypeNo())
				.missingTitle(missing.getMissingTitle())
				.missingContent(missing.getMissingContent())
				.missingDate(missing.getMissingDate())
				.missingLat(missing.getMissingLat())
				.missingLng(missing.getMissingLng())
				.missingAddress(missing.getMissingAddress())
				.dogNo(missing.getDogNo())
				.missingImages(imageUrls)
				.build();
		
		// 함께찾기 topicId 등록
		missingInfoResponseDto.setTopicId(finddogService.getFinddogTopicId(missingNo));
		
		return missingInfoResponseDto;
	}

	@Override
	@Transactional
	public void updateMissing(MissingUpdateRequestDto missingUpdateRequestDto) {
	
		Missing missing = missingRepository.findByMissingNoAndCanceled(
				missingUpdateRequestDto.getMissingNo(), BaseConstant.NOTCANCELED.intValue())
				.orElseThrow(() -> new NotFoundException(MissingResponseMessage.MISSING_NOT_FOUND.message()));
		Integer missingNo = missingUpdateRequestDto.getMissingNo();
		
		missing.updateMissing(missingUpdateRequestDto);
		List<Image> originImageList = imageRepository.findAllByImageTypeNoAndParentNoAndCanceled(ImageType.MISSING.value(), missingNo, NOTCANCELED);
		for (Image image : originImageList) {
			image.setCanceled(CANCELED);
			imageRepository.save(image);
		}
		List<String> updatedImageList = missingUpdateRequestDto.getMissingImages();
		for (String newUrl : updatedImageList) {
			imageRepository.save(
					Image.builder()
						.imageTypeNo(ImageType.MISSING.value())
						.imageUrl(newUrl)
						.parentNo(missingNo)
						.build());
		}
		missingRepository.save(missing);
	}

	@Override
	public void updateMissingStatus(Integer userNo, Integer missingNo) {
		User user = userRepository.findUserByUserNoAndCanceled(userNo, BaseConstant.NOTCANCELED.intValue())
				.orElseThrow(() -> new NotFoundException(UserExceptionMessage.USER_NOT_FOUND_EXCEPTION.message()));
		
		Missing missing = missingRepository.findByMissingNoAndCanceled(missingNo, BaseConstant.NOTCANCELED.intValue())
				.orElseThrow(() -> new NotFoundException(MissingResponseMessage.MISSING_NOT_FOUND.message()));
		
		if (missing.getUserNo() != user.getUserNo()) 
			throw new ForbiddenException(MissingResponseMessage.DELETE_FORBIDDEN.message());
		
		missing.setMissingStatus(MissingStatus.FOUND.value());
		missingRepository.save(missing);
	}

	@Override
	public void deleteMissing(Integer userNo, Integer missingNo) {
		User user = userRepository.findUserByUserNoAndCanceled(userNo, BaseConstant.NOTCANCELED.intValue())
				.orElseThrow(() -> new NotFoundException(UserExceptionMessage.USER_NOT_FOUND_EXCEPTION.message()));
		
		Missing missing = missingRepository.findByMissingNoAndCanceled(missingNo, BaseConstant.NOTCANCELED.intValue())
				.orElseThrow(() -> new NotFoundException(MissingResponseMessage.MISSING_NOT_FOUND.message()));
		
		if (missing.getUserNo() != user.getUserNo()) 
			throw new ForbiddenException(MissingResponseMessage.DELETE_FORBIDDEN.message());
		
		missing.setCanceled(BaseConstant.CANCELED.intValue());
		
        // 이미지 리스트 삭제
        List<Image> list = imageRepository.findAllByImageTypeNoAndParentNoAndCanceled(
        		ImageType.MISSING.value(), missingNo, NOTCANCELED);
        for(Image image : list){
            image.setCanceled(CANCELED);
            imageRepository.save(image);
        }
		missingRepository.save(missing);
	}

	@Override
	public List<RecentMissingImageDto> getRecentMissingImages() {
		List<RecentMissingImageDto> recentImages = missingRepository.getLimitedThreeRecentMissingImages();
        recentImages = recentImages.subList(0, Math.min(recentImages.size(), 3)); // 결과를 3개로 제한
		return recentImages;
	}

}
