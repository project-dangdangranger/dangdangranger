package com.shield.dangdangranger.domain.region.controller;

import static com.shield.dangdangranger.domain.region.constant.RegionResponseMessage.READ_DONG_SUCCESS;
import static com.shield.dangdangranger.domain.region.constant.RegionResponseMessage.READ_GUGUN_SUCCESS;
import static com.shield.dangdangranger.domain.region.constant.RegionResponseMessage.READ_SIDO_SUCCESS;

import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.DongInfoResponseDto;
import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.GugunInfoResponseDto;
import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.SidoInfoResponseDto;
import com.shield.dangdangranger.domain.region.service.RegionService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/region")
@RequiredArgsConstructor
@Slf4j
public class RegionController {

    private final RegionService regionService;

    @GetMapping("/sido")
    public ResponseEntity<ResponseDto<SidoInfoResponseDto>> readSido() {
        return ResponseEntity.status(HttpStatus.OK)
            .body(ResponseDto.create(READ_SIDO_SUCCESS.message(), regionService.readSido()));
    }

    @GetMapping("/gugun")
    public ResponseEntity<ResponseDto<GugunInfoResponseDto>> readGugun(@RequestParam String sido) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(ResponseDto.create(READ_GUGUN_SUCCESS.message(), regionService.readGugun(sido)));
    }

    @GetMapping("/dong")
    public ResponseEntity<ResponseDto<DongInfoResponseDto>> readDong(@RequestParam String gugun) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(ResponseDto.create(READ_DONG_SUCCESS.message(), regionService.readDong(gugun)));
    }
}
