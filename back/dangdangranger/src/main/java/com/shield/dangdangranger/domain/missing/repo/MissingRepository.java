package com.shield.dangdangranger.domain.missing.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shield.dangdangranger.domain.missing.entity.Missing;
import com.shield.dangdangranger.domain.missing.repo.custom.MissingRepositoryCustom;

public interface MissingRepository extends JpaRepository<Missing, Integer>, MissingRepositoryCustom  {

}
