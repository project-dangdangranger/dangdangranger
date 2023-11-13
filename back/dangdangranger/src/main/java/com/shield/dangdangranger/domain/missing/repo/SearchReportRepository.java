package com.shield.dangdangranger.domain.missing.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shield.dangdangranger.domain.missing.entity.SearchReport;

public interface SearchReportRepository  extends JpaRepository<SearchReport, Integer> {

	List<SearchReport> findAllByMissingNoAndCanceled(Integer missingNo, int canceled);
	
	Optional<SearchReport> findOneBySearchReportNoAndCanceled(Integer searchReportNo, int canceled);
}
