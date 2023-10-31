package com.shield.dangdangranger.domain.region.service;

import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.DongInfoResponseDto;
import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.GugunInfoResponseDto;
import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.SidoInfoResponseDto;
import com.shield.dangdangranger.domain.region.entity.Gugun;
import com.shield.dangdangranger.domain.region.entity.Sido;
import com.shield.dangdangranger.domain.region.repo.DongRepository;
import com.shield.dangdangranger.domain.region.repo.GugunRepository;
import com.shield.dangdangranger.domain.region.repo.SidoRepository;
import com.shield.dangdangranger.domain.region.vo.RegionVo.DongVo;
import com.shield.dangdangranger.domain.region.vo.RegionVo.GugunVo;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegionServiceImpl implements RegionService{
    private final DongRepository dongRepository;
    private final GugunRepository gugunRepository;
    private final SidoRepository sidoRepository;

    @Override
    public SidoInfoResponseDto readSido() {
        return SidoInfoResponseDto.builder()
            .sidos(sidoRepository.findAll())
            .build();
    }

    @Override
    public GugunInfoResponseDto readGugun(String sidoCode) {
        Sido sido = sidoRepository.findBySidoCode(sidoCode).orElseThrow();
        return GugunInfoResponseDto.builder()
            .guguns(gugunRepository.findAllBySidoCode(sido).stream().map(GugunVo::new).collect(Collectors.toList()))
            .build();
    }

    @Override
    public DongInfoResponseDto readDong(String gugunCode) {
        Gugun gugun = gugunRepository.findByGugunCode(gugunCode).orElseThrow();
        return DongInfoResponseDto.builder()
            .dongs(dongRepository.findAllByGugunCode(gugun).stream().map(DongVo::new).collect(Collectors.toList()))
            .build();
    }
}
