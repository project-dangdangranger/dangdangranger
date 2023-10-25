package com.shield.dangdangranger.domain.region.repo;

import com.shield.dangdangranger.domain.region.entity.Dong;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DongRepository extends JpaRepository<Dong, String> {
    Optional<Dong> findDongByDongCode(String dongCode);
}
