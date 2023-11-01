package com.shield.dangdangranger.domain.badge.repo;

import com.shield.dangdangranger.domain.badge.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BadgeRepository extends JpaRepository<UserBadge, Integer> {
    List<UserBadge> findAllByUserNoAndCanceled(Integer userNo, Integer canceled);

    Optional<UserBadge> findUserBadgeByUserBadgeNoAndCanceled(Integer userBadgeNo, Integer canceled);
}
