package com.shield.dangdangranger.domain.region.service;

import com.shield.dangdangranger.domain.region.dto.RegionResponseDto.RegionInfoResponseDto;
import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.entity.Gugun;
import com.shield.dangdangranger.domain.region.entity.Sido;
import com.shield.dangdangranger.domain.region.repo.DongRepository;
import com.shield.dangdangranger.domain.region.repo.GugunRepository;
import com.shield.dangdangranger.domain.region.repo.SidoRepository;
import java.util.List;
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
    public RegionInfoResponseDto readRegion() {
        List<Sido> sidos = sidoRepository.findAll();
        List<Gugun> guguns = gugunRepository.findAll();
        List<Dong> dongs = dongRepository.findAll();

        return RegionInfoResponseDto.builder()
            .sidos(sidos)
            .guguns(guguns)
            .dongs(dongs)
            .build();
    }
}
