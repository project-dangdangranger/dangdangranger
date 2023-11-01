package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.Image.entity.Image;
import com.shield.dangdangranger.domain.Image.repo.ImageRepository;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.*;
import com.shield.dangdangranger.domain.patrol.dto.PatrolReportResponseDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.patrol.repo.PatrolLogRepository;
import com.shield.dangdangranger.domain.patrol.repo.PatrolReportRepository;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.domain.user.repo.UserRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.entity.BaseEntity;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import static com.shield.dangdangranger.domain.Image.constant.ImageExceptionMessage.IMAGE_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolLogResponseMessage.PATROL_LOG_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.patrol.constant.PatrolReportResponseMessage.PATROL_REPORT_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.user.constant.UserExceptionMessage.USER_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.global.constant.BaseConstant.CANCELED;
import static com.shield.dangdangranger.global.constant.BaseConstant.NOTCANCELED;

@Service
@RequiredArgsConstructor
@Slf4j
public class PatrolReportServiceImpl implements PatrolReportService {

    private final PatrolReportRepository patrolReportRepository;
    private final PatrolLogRepository patrolLogRepository;
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    @Override
    public PatrolReport registPatrolReport(Integer userNo, PatrolReportSaveRequestDto patrolReportSaveRequestDto) {
        PatrolLog patrolLog = patrolLogRepository
                .findPatrolLogByPatrolLogNoAndCanceled(patrolReportSaveRequestDto.getPatrolLogNo(), NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_LOG_NOT_FOUND_EXCEPTION.message()));

        //순찰일지 insert
        PatrolReport patrolReport = PatrolReport.builder()
                .userNo(userNo)
                .patrolReportTitle(patrolReportSaveRequestDto.getPatrolReportTitle())
                .patrolReportContent(patrolReportSaveRequestDto.getPatrolReportContent())
                .patrolReportHit(0)
                .patrolLog(patrolLog)
                .build();

        patrolReportRepository.save(patrolReport);
        //순찰일지 번호 받아오기
        Integer nowPatrolReportNo = patrolReport.getPatrolReportNo();

        //순찰일지 이미지 insert
        List<String> patrolImageList = patrolReportSaveRequestDto.getPatrolReportImageList();
        for (int i = 0; i < patrolImageList.size(); i++) {
            Image image = Image.builder()
                    .imageTypeCode("R")
                    .parentNo(nowPatrolReportNo)
                    .imageUrl(patrolImageList.get(i))
                    .build();
            imageRepository.save(image);
        }

        return patrolReport;
    }

    @Override
    public List<PatrolListInfoResponseDto> selectRegionAll(Integer userNo) {
        List<PatrolReport> reportList = patrolReportRepository.findAllByUserDongCodeAndCanceld(userNo, NOTCANCELED);
        List<PatrolListInfoResponseDto> list = new ArrayList<>();

        for (int i = 0; i < reportList.size(); i++) {
            PatrolReport patrolReport = reportList.get(i);
            User user = userRepository.findUserByUserNoAndCanceled(patrolReport.getUserNo(), NOTCANCELED)
                    .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));
            Image image = imageRepository.findFirstByImageTypeCodeAndParentNoAndCanceled("R", patrolReport.getPatrolReportNo(), NOTCANCELED)
                    .orElseThrow(() -> new NotFoundException(IMAGE_NOT_FOUND_EXCEPTION.message()));

            PatrolListInfoResponseDto patrolListInfo = PatrolListInfoResponseDto.builder()
                    .patrolNo(patrolReport.getPatrolReportNo())
                    .patrolTitle(patrolReport.getPatrolReportTitle())
                    .patrolDate(patrolReport.getPatrolLog().getPatrolLogDate())
                    .userName(user.getUserName())
                    .patrolFirstImg(image.getImageUrl())
                    .patrolHit(patrolReport.getPatrolReportHit())
                    .build();

            list.add(patrolListInfo);
        }
        return list;
    }

    @Override
    public List<PatrolListInfoResponseDto> selectMyAll(Integer userNo) {
        List<PatrolReport> reportList = patrolReportRepository
                .findAllByUserNoAndCanceledOrderByCreateDateDesc(userNo, NOTCANCELED);
        List<PatrolListInfoResponseDto> list = new ArrayList<>();

        for (int i = 0; i < reportList.size(); i++) {
            PatrolReport patrolReport = reportList.get(i);
            User user = userRepository.findUserByUserNoAndCanceled(userNo, NOTCANCELED)
                    .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

            PatrolListInfoResponseDto patrolListInfo = PatrolListInfoResponseDto.builder()
                    .patrolNo(patrolReport.getPatrolReportNo())
                    .patrolTitle(patrolReport.getPatrolReportTitle())
                    .patrolDate(patrolReport.getPatrolLog().getPatrolLogDate())
                    .userName(user.getUserName())
                    .patrolHit(patrolReport.getPatrolReportHit())
                    .build();

            list.add(patrolListInfo);
        }
        return list;
    }

    @Override
    public PatrolReportInfoResponseDto selectOnePatrolReport(Integer patrolNo) {
        //순찰일지 정보
        PatrolReport infoResponseDto = patrolReportRepository
                .findPatrolReportByPatrolReportNoAndCanceled(patrolNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_REPORT_NOT_FOUND_EXCEPTION.message()));

        //순찰로그 정보
        PatrolLog patrolLog = infoResponseDto.getPatrolLog();
        //순찰일지 이미지리스트
        List<Image> list = imageRepository.findAllByImageTypeCodeAndParentNoAndCanceled("R", patrolNo, NOTCANCELED );
        List<String> imageList = new ArrayList<>();
        for (int i = 0; i < imageList.size(); i++) {
            imageList.add(list.get(i).getImageUrl());
        }
        //사용자 정보
        User user = userRepository.findUserByUserNoAndCanceled(infoResponseDto.getUserNo(), NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_EXCEPTION.message()));

        //상세조회시 조회수 증가
        infoResponseDto.updateHit(infoResponseDto.getPatrolReportHit());

        return PatrolReportInfoResponseDto.builder()
                .patrolReportNo(infoResponseDto.getPatrolReportNo())
                .patrolReportTitle(infoResponseDto.getPatrolReportTitle())
                .patrolReportContent(infoResponseDto.getPatrolReportContent())
                .patrolReportHit(infoResponseDto.getPatrolReportHit())
                .userName(user.getUserName())
                .patrolLogDate(patrolLog.getPatrolLogDate())
                .dongName(patrolLog.getDong().getDongName())
                .patrolLogTotalDistance(patrolLog.getPatrolLogTotalDistance())
                .patrolLogTotalTime(patrolLog.getPatrolLogTotalTime())
                .patrolLogLat(patrolLog.getPatrolLogLat())
                .patrolLogLng(patrolLog.getPatrolLogLng())
                .patrolLogImageUrl(patrolLog.getPatrolLogImageUrl())
                .patrolReportImages(imageList)
                .build();
    }

    @Override
    public void updatePatrolReport(PatrolReportUpdateRequestDto updateRequestDto) {
        Integer patrolNo = updateRequestDto.getPatrolNo();
        PatrolReport patrolReport = patrolReportRepository.findPatrolReportByPatrolReportNoAndCanceled(patrolNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_REPORT_NOT_FOUND_EXCEPTION.message()));

        //제목, 컨텐츠 수정
        patrolReport.updatePatrolReport(updateRequestDto.getPatrolReportTitle(), updateRequestDto.getPatrolReportContent());

        //순찰일지 이미지리스트
        List<Image> list = imageRepository.findAllByImageTypeCodeAndParentNoAndCanceled("R", patrolNo, NOTCANCELED);
        List<String> imageList = new ArrayList<>();
        for (int i = 0; i < imageList.size(); i++) {
            imageList.add(list.get(i).getImageUrl());
        }
        List<String> updateImageList = updateRequestDto.getPatrolReportImageList();

        HashSet<String> imageOriginHash = new HashSet<>();
        HashSet<String> imageNewHash = new HashSet<>();

        for (int i = 0; i < imageList.size(); i++) { //원래 순찰일지 이미지리스트
            imageOriginHash.add(imageList.get(i));
        }

        for (int i = 0; i < updateImageList.size(); i++) { //수정된 순찰일지 이미지리스트
            imageNewHash.add(list.get(i).getImageUrl());
        }

        for (int i = 0; i < imageList.size(); i++) { //삭제된 이미지는 cancel 처리하기
            if(!imageNewHash.contains(imageList.get(i))){
                Image image = imageRepository.findImageByImageUrlAndCanceled(imageList.get(i), NOTCANCELED)
                        .orElseThrow(()-> new NotFoundException(IMAGE_NOT_FOUND_EXCEPTION.message()));
                image.setCanceled(CANCELED);
                imageRepository.save(image);
            }
        }

        for (int i = 0; i < updateImageList.size(); i++) { //추가된 순찰일지 insert하기
            if(!imageOriginHash.contains(updateImageList.get(i))){
                Image image = Image.builder()
                        .imageTypeCode("R")
                        .imageUrl(updateImageList.get(i))
                        .parentNo(patrolNo)
                        .build();
                imageRepository.save(image);

            }
        }

        patrolReportRepository.save(patrolReport);

    }

    @Override
    public void deletePatrolReport(Integer patrolNo) {
        PatrolReport patrolReport = patrolReportRepository.findPatrolReportByPatrolReportNoAndCanceled(patrolNo, NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(PATROL_REPORT_NOT_FOUND_EXCEPTION.message()));
        patrolReport.setCanceled(CANCELED);
        patrolReportRepository.save(patrolReport);
    }

}
