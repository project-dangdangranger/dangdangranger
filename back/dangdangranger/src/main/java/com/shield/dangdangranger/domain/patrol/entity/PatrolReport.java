package com.shield.dangdangranger.domain.patrol.entity;

import com.shield.dangdangranger.domain.patrol.dto.PatrolReportRequestDto.*;
import com.shield.dangdangranger.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "patrolreport")
public class PatrolReport extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "patrol_report_no")
    private Integer patrolReportNo;

    @Column(name = "user_no")
    private Integer userNo;

    @Column(name = "patrol_report_title")
    private String patrolReportTitle;

    @Column(name = "patrol_report_content")
    private String patrolReportContent;

    @Column(name = "patrol_report_hit")
    private Integer patrolReportHit;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patrol_log_no")
    private PatrolLog patrolLog;

    @OneToMany(mappedBy = "patrol_comment")
    private List<PatrolComment> patrolComments = new ArrayList<>();

    @Builder
    public PatrolReport(Integer userNo, String patrolReportTitle, String patrolReportContent, Integer patrolReportHit, PatrolLog patrolLog  ) {
        this.userNo = userNo;
        this.patrolReportTitle = patrolReportTitle;
        this.patrolReportContent = patrolReportContent;
        this.patrolReportHit = patrolReportHit;
        this.patrolLog = patrolLog;
    }

    public PatrolReport updateHit(Integer patrolReportHit){
        this.patrolReportHit = patrolReportHit+1;
        return this;
    }

    public void updatePatrolReport(String patrolReportTitle, String patrolReportContent){
        this.patrolReportTitle = patrolReportTitle;
        this.patrolReportContent = patrolReportContent;
    }




}
