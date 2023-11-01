package com.shield.dangdangranger.domain.region.repo;

import com.shield.dangdangranger.domain.region.entity.Gugun;
import com.shield.dangdangranger.domain.region.entity.Sido;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GugunRepository extends JpaRepository<Gugun, String>{
    Optional<Gugun> findByGugunCode(String gugunCode);
    List<Gugun> findAllBySidoCode(Sido sido);
}
