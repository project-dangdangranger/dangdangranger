package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolCommentResponseMessage {

    CREATE_PATROL_COMMENT_SUCCESS("순찰일지 댓글 추가 완료"),
    PATROL_COMMENT_NOT_FOUND_EXCEPTION("순찰 일지 댓글 상세 조회 실패 : 순찰 기록 없음"),
    PATROL_COMMENT_UPDATE_SUCCESS("순찰일지 댓글 수정 완료")
    ;

    private final String message;

    PatrolCommentResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
