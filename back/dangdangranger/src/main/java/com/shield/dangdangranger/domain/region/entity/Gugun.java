package com.shield.dangdangranger.domain.region.entity;

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
@Table(name = "gugun")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Gugun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gugun_code")
    private String gugunCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sido_code")
    private Sido sidoCode;

    private String gugunName;

    @Builder
    public Gugun(Sido sidoCode, String gugunName) {
        this.sidoCode = sidoCode;
        this.gugunName = gugunName;
    }

}
