package com.shield.dangdangranger.domain.patrol.repo;

import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatrolLogRepository extends JpaRepository<PatrolLog, Integer> {

    List<PatrolLog> findAllByCanceledOrderByCreateDateDesc(Integer canceled);

    Optional<PatrolLog> findPatrolLogByPatrolLogNoAndCanceled(Integer patrolLogNo,
        Integer isCanceled);
}
