package com.shield.dangdangranger.domain.region.repo.custom;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.region.entity.QDong;
import com.shield.dangdangranger.domain.region.entity.QGugun;
import com.shield.dangdangranger.domain.region.entity.QSido;
import com.shield.dangdangranger.domain.region.vo.RegionVo.AddressVo;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DogCustomRepositoryImpl implements DongCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<Dong> findDongByAddress(AddressVo addressVo) {
        QDong qDong = QDong.dong;
        QSido qSido = QSido.sido;
        QGugun qGugun = QGugun.gugun;

        /**
         * Optional.ofNullable(jpaQueryFactory
         *             .select(qDong)
         *             .from(qSido)
         *             .join(qGugun.sidoCode, qSido)
         *             .join(qDong.gugunCode, qGugun)
         *             .where(qSido.sidoName.eq(addressVo.getSidoName())
         *                 .and(qGugun.gugunName.eq(addressVo.getGugunName()))
         *                 .and(qDong.dongName.eq(addressVo.getDongName()))
         *             ).fetchOne());
         */

        return Optional.ofNullable(
            jpaQueryFactory
            .select(qDong)
            .from(qSido)
            .join(qGugun).on(qSido.sidoCode.eq(qGugun.sidoCode.sidoCode))
            .join(qDong).on(qGugun.gugunCode.eq(qDong.gugunCode.gugunCode))
            .where(qSido.sidoName.eq(addressVo.getSidoName())
                .and(qGugun.gugunName.eq(addressVo.getGugunName()))
                .and(qDong.dongName.eq(addressVo.getDongName())))
            .fetchOne());
    }
}
