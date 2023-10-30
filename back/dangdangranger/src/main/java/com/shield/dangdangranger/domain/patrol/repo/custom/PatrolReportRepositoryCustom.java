package com.shield.dangdangranger.domain.patrol.repo.custom;

import com.shield.dangdangranger.domain.patrol.entity.PatrolReport;

import java.util.List;

public interface PatrolReportRepositoryCustom {

    List<PatrolReport> findAllByUserDongCodeAndCanceld(String userdong, Integer isCanceled);
}
