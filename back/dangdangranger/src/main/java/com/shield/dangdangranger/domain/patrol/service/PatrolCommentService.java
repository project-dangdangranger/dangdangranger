package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolCommentRequestDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolComment;

public interface PatrolCommentService {

    public PatrolComment registPatrolComment(Integer userNo, RegistRequestDto registRequestDto);

}
