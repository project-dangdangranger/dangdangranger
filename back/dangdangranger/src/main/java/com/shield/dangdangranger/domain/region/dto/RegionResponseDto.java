package com.shield.dangdangranger.domain.region.dto;


import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.entity.Gugun;
import com.shield.dangdangranger.domain.region.entity.Sido;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RegionResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class RegionInfoResponseDto {
        private List<Sido> sidos;
        private List<Gugun> guguns;
        private List<Dong> dongs;
    }
}
