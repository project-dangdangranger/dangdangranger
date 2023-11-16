package com.shield.dangdangranger.domain.region.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dong")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Dong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dong_code")
    private String dongCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gugun_code")
    private Gugun gugunCode;

    private String dongName;

    private String address;

    @Builder
    public Dong(Gugun gugunCode, String dongName, String address) {
        this.gugunCode = gugunCode;
        this.dongName = dongName;
        this.address = address;
    }
}
