package com.shield.dangdangranger.domain.missing.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shield.dangdangranger.domain.missing.entity.Missing;

public interface MissingRepository extends JpaRepository<Missing, Integer> {

	//
	long countByMissing(String someCondition);
}
