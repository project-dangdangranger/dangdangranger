package com.shield.dangdangranger.domain.region.service;

import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.DongInfoResponseDto;
import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.GugunInfoResponseDto;
import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.SidoInfoResponseDto;

public interface RegionService {
    SidoInfoResponseDto readSido();
    GugunInfoResponseDto readGugun(String sido);
    DongInfoResponseDto readDong(String gugun);
}
