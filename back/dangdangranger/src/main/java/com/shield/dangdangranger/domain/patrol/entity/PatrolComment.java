package com.shield.dangdangranger.domain.patrol.entity;

import com.shield.dangdangranger.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "patrol_comment")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PatrolComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer patrolCommentNo;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer patrolNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_no")
    private User user;

    @Column(name = "patrol_comment_content")
    private String patrolCommentContent;

    @Builder
    public PatrolComment(Integer patrolNo, User user, String patrolCommentContent) {
        this.patrolNo = patrolNo;
        this.user = user;
        this.patrolCommentContent = patrolCommentContent;
    }

}
