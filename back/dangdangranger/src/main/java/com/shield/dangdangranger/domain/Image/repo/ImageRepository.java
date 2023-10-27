package com.shield.dangdangranger.domain.Image.repo;

import com.shield.dangdangranger.domain.Image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    Optional<Image> findFirstByImageTypeCodeAndParentNoAndCanceled(String imageTypeCode, Integer patrolReportNo, Integer isCanceld);

}
