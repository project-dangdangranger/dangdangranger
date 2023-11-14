package com.shield.dangdangranger.domain.dog.entity;

import com.shield.dangdangranger.global.entity.BaseEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "script")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Script extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scriptNo;

    private String scriptContent;

    @Builder
    public Script(String scriptContent) {
        this.scriptContent = scriptContent;
    }
}
