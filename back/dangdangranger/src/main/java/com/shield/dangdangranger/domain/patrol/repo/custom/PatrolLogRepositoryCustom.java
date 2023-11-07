package com.shield.dangdangranger.domain.patrol.repo.custom;

import com.shield.dangdangranger.domain.patrol.entity.PatrolLog;
import java.util.List;

public interface PatrolLogRepositoryCustom {
    List<PatrolLog> findAllPatrolLogByUser(Integer userNo, Integer isCanceled);
}
