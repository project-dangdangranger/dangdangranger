package com.shield.dangdangranger.domain.region.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sido")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Sido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sido_code")
    private String sidoCode;

    private String sidoName;

    @Builder
    public Sido(String sidoName) {
        this.sidoName = sidoName;
    }
}
