package com.shield.dangdangranger.domain.patrol.constant;

public enum PatrolCommentResponseMessage {

    CREATE_PATROL_COMMENT_SUCCESS("순찰일지 댓글 추가 완료")
    ;

    private final String message;

    PatrolCommentResponseMessage(String message) {
        this.message = message;
    }

    public String message() {
        return this.message;
    }
}
