package com.shield.dangdangranger.domain.patrol.controller;

import com.shield.dangdangranger.domain.patrol.dto.PatrolCommentRequestDto.*;
import com.shield.dangdangranger.domain.patrol.service.PatrolCommentService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.shield.dangdangranger.domain.patrol.constant.PatrolCommentResponseMessage.CREATE_PATROL_COMMENT_SUCCESS;

@RestController
@RequestMapping("/api/patrolcomment")
@RequiredArgsConstructor
@Slf4j
public class PatrolCommentController {

    private final PatrolCommentService patrolCommentService;

    @PostMapping()
    public ResponseEntity<ResponseDto<String>> createPatrolReport(
            @RequestAttribute("userNo") Integer userNo, @RequestBody RegistRequestDto registRequestDto) {

        patrolCommentService.registPatrolComment(userNo, registRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseDto.create(CREATE_PATROL_COMMENT_SUCCESS.message()));
    }


}
