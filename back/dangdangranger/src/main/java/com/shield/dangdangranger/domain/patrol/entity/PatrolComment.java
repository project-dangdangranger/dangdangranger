package com.shield.dangdangranger.domain.patrol.entity;

import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "patrol_comment")
public class PatrolComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patrol_comment_no")
    private Integer patrolCommentNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_no")
    private User user;

    @Column(name = "patrol_comment_content")
    private String patrolCommentContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patrol_report_no")
    private PatrolReport patrolReport;

    @Builder
    public PatrolComment(User user, String patrolCommentContent, PatrolReport patrolReport) {
        this.user = user;
        this.patrolCommentContent = patrolCommentContent;
        this.patrolReport = patrolReport;
    }

    public void updatePatrolComment(String patrolCommentContent){
        this.patrolCommentContent = patrolCommentContent;
    }

}
