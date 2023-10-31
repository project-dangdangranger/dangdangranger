package com.shield.dangdangranger.domain.region.dto;


import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.entity.Gugun;
import com.shield.dangdangranger.domain.region.entity.Sido;
import com.shield.dangdangranger.domain.region.vo.RegionVo.DongVo;
import com.shield.dangdangranger.domain.region.vo.RegionVo.GugunVo;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RegionResponseDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class SidoInfoResponseDto {
        private List<Sido> sidos;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class GugunInfoResponseDto {
        private List<GugunVo> guguns;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DongInfoResponseDto {
        private List<DongVo> dongs;
    }
}
