package com.shield.dangdangranger.domain.patrol.entity;

import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.user.entity.User;
import com.shield.dangdangranger.global.entity.BaseEntity;
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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "patrol_log")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PatrolLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patrol_log_no")
    private Integer patrolLogNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_code")
    private Dong dong;

    private LocalDateTime patrolLogDate;
    private Double patrolLogTotalDistance;
    private Integer patrolLogTotalTime;
    private Double patrolLogLat;
    private Double patrolLogLng;
    private String patrolLogImageUrl;
    private Integer patrolLogWritten;

    @Builder
    public PatrolLog(Integer patrolLogNo, User user, Dong dong, LocalDateTime patrolLogDate,
        Double patrolLogTotalDistance, Integer patrolLogTotalTime, Integer patrolLogWritten,
        Double patrolLogLat, Double patrolLogLng, String patrolLogImageUrl) {
        this.patrolLogNo = patrolLogNo;
        this.user = user;
        this.dong = dong;
        this.patrolLogDate = patrolLogDate;
        this.patrolLogTotalDistance = patrolLogTotalDistance;
        this.patrolLogTotalTime = patrolLogTotalTime;
        this.patrolLogWritten = patrolLogWritten;
        this.patrolLogLat = patrolLogLat;
        this.patrolLogLng = patrolLogLng;
        this.patrolLogImageUrl = patrolLogImageUrl;
    }
}
