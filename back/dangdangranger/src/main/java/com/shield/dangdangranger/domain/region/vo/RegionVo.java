package com.shield.dangdangranger.domain.region.vo;

import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.entity.Gugun;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class RegionVo {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class GugunVo {
        private String gugunCode;
        private String gugunName;

        public GugunVo(Gugun gugun) {
            this.gugunCode = gugun.getGugunCode();
            this.gugunName = gugun.getGugunName();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DongVo {
        private String dongCode;
        private String dongName;

        public DongVo(Dong dong) {
            this.dongCode = dong.getDongCode();
            this.dongName = dong.getDongName();
        }
    }
}
