package com.shield.dangdangranger.domain.patrol.repo;

import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;
import com.shield.dangdangranger.domain.patrol.repo.custom.PatrolReportRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatrolReportRepository extends JpaRepository<PatrolReport, Integer> , PatrolReportRepositoryCustom {

    public List<PatrolReport> findAllByCanceledOrderByCreateDateDesc(Integer isCanceled);

    public Optional<PatrolReport> findPatrolReportByPatrolReportNoAndCanceled(Integer patrolReportNo, Integer isCanceled);

    public List<PatrolReport> findAllByUserNoAndCanceledOrderByCreateDateDesc(Integer userNo, Integer isCanceled);



}
