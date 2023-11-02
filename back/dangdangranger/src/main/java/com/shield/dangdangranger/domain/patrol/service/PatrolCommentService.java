package com.shield.dangdangranger.domain.patrol.service;

import com.shield.dangdangranger.domain.patrol.dto.PatrolCommentRequestDto.*;
import com.shield.dangdangranger.domain.patrol.entity.PatrolComment;

import java.util.List;

public interface PatrolCommentService {

    public PatrolComment registPatrolComment(Integer userNo, RegistRequestDto registRequestDto);

    public void updatePatrolComment(UpdateRequestDto updateRequestDto);


}
