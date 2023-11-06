package com.shield.dangdangranger.domain.missing.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shield.dangdangranger.domain.missing.entity.Missing;
import com.shield.dangdangranger.domain.missing.repo.custom.MissingRepositoryCustom;
import java.util.Optional;


public interface MissingRepository extends JpaRepository<Missing, Integer>, MissingRepositoryCustom  {

	Optional<Missing> findByMissingNoAndCanceled(Integer missingNo, int canceled);
}
