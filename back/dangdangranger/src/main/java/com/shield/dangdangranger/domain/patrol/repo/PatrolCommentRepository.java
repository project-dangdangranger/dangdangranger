package com.shield.dangdangranger.domain.patrol.repo;

import com.shield.dangdangranger.domain.patrol.entity.PatrolComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatrolCommentRepository extends JpaRepository<PatrolComment, Integer> {

    public Optional<PatrolComment> findPatrolCommentByPatrolCommentNoAndCanceled(Integer patrolCommentNo, Integer isCanceld);

    public List<PatrolComment> findAllByPatrolNoAndCanceled(Integer patrolNo, Integer isCanceled);



}
