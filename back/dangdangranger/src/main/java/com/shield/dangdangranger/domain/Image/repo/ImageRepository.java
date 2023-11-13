package com.shield.dangdangranger.domain.Image.repo;

import com.shield.dangdangranger.domain.Image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    Optional<Image> findFirstByImageTypeNoAndParentNoAndCanceled(Integer imageTypeNo, Integer patrolReportNo, Integer isCanceled);

    List<Image> findAllByImageTypeNoAndParentNoAndCanceled(Integer imageTypeNo, Integer parentNo, Integer isCanceled);

    Optional<Image> findImageByImageUrlAndCanceled(String imageUrl, Integer isCanceled);
    
    Optional<Image> findFirstImageUrlByImageTypeNoAndParentNoAndCanceled(Integer imageTypeNo, Integer parentNo, Integer isCanceled);

}
