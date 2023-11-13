package com.shield.dangdangranger.domain.missing.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shield.dangdangranger.domain.missing.entity.SearchReport;

public interface SearchReportRepository  extends JpaRepository<SearchReport, Integer> {

}
