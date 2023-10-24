package com.shield.dangdangranger.domain.patrol.repo;

import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatrolLogRepository extends JpaRepository<PatrolLog, Integer> {

}
