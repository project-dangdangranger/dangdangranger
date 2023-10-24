package com.shield.dangdangranger.domain.region.controller;

import static com.shield.dangdangranger.domain.region.constant.RegionResponseMessage.READ_REGION_SUCCESS;

import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.RegionInfoResponseDto;
import com.shield.dangdangranger.domain.region.service.RegionService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/region")
@RequiredArgsConstructor
@Slf4j
public class RegionController {

    private final RegionService regionService;

    @GetMapping()
    public ResponseEntity<ResponseDto<RegionInfoResponseDto>> readSidoGugunDong() {
        return ResponseEntity.status(HttpStatus.OK)
            .body(ResponseDto.create(READ_REGION_SUCCESS.message(),
                regionService.readRegion()));
    }

}
