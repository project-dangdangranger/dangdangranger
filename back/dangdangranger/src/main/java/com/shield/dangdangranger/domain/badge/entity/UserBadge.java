package com.shield.dangdangranger.domain.badge.entity;

import com.shield.dangdangranger.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_badge")
public class UserBadge extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_badge_no")
    private Integer userBadgeNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "badge_no")
    private Badge badge;

    @Column(name = "user_no")
    private Integer userNo;

    @Column(name = "user_badge_cnt")
    private Integer userBadgeCnt;

    @Column(name = "user_badge_completed")
    private Integer userBadgeCompleted;

    @Column(name = "user_badge_completed_date")
    private LocalDateTime userBadgeCompletedDate;
}
