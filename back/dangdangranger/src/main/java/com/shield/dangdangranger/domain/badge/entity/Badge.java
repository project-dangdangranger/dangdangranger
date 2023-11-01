package com.shield.dangdangranger.domain.badge.entity;

import com.shield.dangdangranger.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "badge")
public class Badge extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_no")
    private Integer badgeNo;

    @Column(name = "badge_name")
    private String badgeName;

    @Column(name = "badge_desc")
    private String badgeDesc;

    @Column(name = "badge_complete_cnt")
    private Integer badgeCompleteCnt;

    @Column(name = "badge_uncomplete_image_url")
    private String badgeUncompleteImageUrl;

    @Column(name = "badge_complete_image_url")
    private String badgeCompleteImageUrl;

    @Column(name = "badge_trigger_name")
    private String badgeTriggerName;
}
