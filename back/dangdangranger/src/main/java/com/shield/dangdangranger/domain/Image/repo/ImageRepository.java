package com.shield.dangdangranger.domain.Image.repo;

import com.shield.dangdangranger.domain.Image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}
