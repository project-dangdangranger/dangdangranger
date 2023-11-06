package com.shield.dangdangranger.domain.region.repo.custom;

import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.vo.RegionVo.AddressVo;
import java.util.Optional;

public interface DongCustomRepository {
    Optional<Dong> findDongByAddress(AddressVo addressVo);
}
