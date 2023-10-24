package com.shield.dangdangranger.domain.patrol.entity;

import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.global.entity.BaseEntity;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder.In;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "patrol_log")
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class PatrolLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log")
    private Integer patrolLogNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_code")
    private DongCode dongCode;

    private LocalDateTime patrolLogDate;
    private Double patrolLogTotalDistance;
    private Integer patrolRecordTotalTime;
    private Double patrolLogLat;
    private Double patrolLogLng;
    private String patrolLogImageUrl;
    private Integer patrolWritten;

    @Builder
    public PatrolLog(Integer patrolLogNo, User user, DongCode dongCode, LocalDateTime patrolLogDate,
        Double patrolLogTotalDistance, Integer patrolRecordTotalTime, Integer patrolWritten,
        Double patrolLogLat, Double patrolLogLng, String patrolLogImageUrl) {
        this.patrolLogNo = patrolLogNo;
        this.user = user;
        this.dongCode = dongCode;
        this.patrolLogDate = patrolLogDate;
        this.patrolLogTotalDistance = patrolLogTotalDistance;
        this.patrolRecordTotalTime = patrolRecordTotalTime;
        this.patrolWritten = patrolWritten;
        this.patrolLogLat = patrolLogLat;
        this.patrolLogLng = patrolLogLng;
        this.patrolLogImageUrl = patrolLogImageUrl;
    }
}
