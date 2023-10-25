package com.shield.dangdangranger.domain.patrol.entity;

import com.shield.dangdangranger.global.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "patrolreport")
public class PatrolReport extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "partrol_report_no")
    private Integer patrolReportNo;

    @Column(name = "user_no")
    private Integer userNo;

    @Column(name = "partrol_report_title")
    private String patrolReportTitle;

    @Column(name = "partrol_report_content")
    private String patrolReportContent;

    @Column(name = "partrol_report_hit")
    private Integer patrolReportHit;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patrol_log_no")
    private PatrolLog patrolLog;

    @Builder
    public PatrolReport(Integer userNo, String patrolReportTitle, String patrolReportContent, Integer patrolReportHit, PatrolLog patrolLog  ) {
        this.userNo = userNo;
        this.patrolReportTitle = patrolReportTitle;
        this.patrolReportContent = patrolReportContent;
        this.patrolReportHit = patrolReportHit;
        this.patrolLog = patrolLog;
    }




}
