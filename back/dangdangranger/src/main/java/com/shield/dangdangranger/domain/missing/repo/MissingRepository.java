package com.shield.dangdangranger.domain.missing.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shield.dangdangranger.domain.missing.dto.RecentMissingImageDto;
import com.shield.dangdangranger.domain.missing.entity.Missing;
import com.shield.dangdangranger.domain.missing.repo.custom.MissingRepositoryCustom;

import java.util.List;
import java.util.Optional;


public interface MissingRepository extends JpaRepository<Missing, Integer>, MissingRepositoryCustom  {

	Optional<Missing> findByMissingNoAndCanceled(Integer missingNo, int canceled);
	
	List<Missing> findByMissingStatusAndCanceled(Integer missingStatus, int canceled);
	
	@Query("SELECT new com.shield.dangdangranger.domain.missing.dto.RecentMissingImageDto(i.parentNo, i.imageUrl) " +
		       "FROM Image i " +
		       "WHERE i.parentNo IN (" +
		       "  SELECT m.missingNo " +
		       "  FROM Missing m " +
		       "  WHERE m.missingTypeNo = 1 " +
		       "    AND m.missingStatus = 0 " +
		       "    AND m.canceled = 0 " +
		       "  ORDER BY m.modifyDate DESC " +
		       ") " +
		       "  AND i.imageTypeNo = 3 " +
		       "  AND i.canceled = 0 " +
		       "GROUP BY i.parentNo " +
		       "ORDER BY i.modifyDate DESC")
	List<RecentMissingImageDto> getLimitedThreeRecentMissingImages();
}
