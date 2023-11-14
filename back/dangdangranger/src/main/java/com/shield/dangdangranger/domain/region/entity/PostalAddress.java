package com.shield.dangdangranger.domain.region.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "postal_address")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostalAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postal_code")
    private String postalCode;

    private String legalDongName;

    @Builder
    public PostalAddress(String legalDongName) {
        this.legalDongName = legalDongName;
    }
}
