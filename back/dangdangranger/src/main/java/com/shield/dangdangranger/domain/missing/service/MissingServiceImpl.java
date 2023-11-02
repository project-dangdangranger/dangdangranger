package com.shield.dangdangranger.domain.missing.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shield.dangdangranger.domain.Image.constant.ImageType;
import com.shield.dangdangranger.domain.Image.entity.Image;
import com.shield.dangdangranger.domain.Image.repo.ImageRepository;
import com.shield.dangdangranger.domain.missing.constant.MissingType;
import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingSaveRequestDto;
import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingUpdateRequestDto;
import com.shield.dangdangranger.domain.missing.dto.MissingResponseDto.MissingListInfoResponseDto;
import com.shield.dangdangranger.domain.missing.entity.Missing;
import com.shield.dangdangranger.domain.missing.repo.MissingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MissingServiceImpl implements MissingService {
	
	private final MissingRepository missingRepository;
	
	private final ImageRepository imageRepository;

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
				.build();
		
		// 내 반려견 실종 등록
		if (missingSaveRequestDto.getMissingTypeNo() == MissingType.MISSING.value()) {
			// TODO Dog 엔티티 유효성 검증?
			missing.setDogNo(missingSaveRequestDto.getDogNo());
		}
		
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

	@Override
	public List<MissingListInfoResponseDto> selectAll(Integer userNo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MissingListInfoResponseDto selectOne(Integer missingNo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateMissing(MissingUpdateRequestDto missingUpdateRequestDto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateMissingStatus(Integer missingNo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteMissing(Integer missingNo) {
		// TODO Auto-generated method stub
		
	}

}
