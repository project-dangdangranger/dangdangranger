package com.shield.dangdangranger.domain.region.repo;

import com.shield.dangdangranger.domain.region.entity.Sido;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SidoRepository extends JpaRepository<Sido, String> {
    Optional<Sido> findBySidoCode(String sidoCode);
}
