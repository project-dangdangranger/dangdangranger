package com.shield.dangdangranger.domain.dog.entity;


import com.shield.dangdangranger.domain.user.entity.User;
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
@Table(name = "dogs")
public class Dog extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dog_no")
    private Integer dogNo;

    @Column(name = "user_no")
    private Integer userNo;

    @Column(name = "dog_name")
    private String dogName;

    @Column(name = "dog_breed")
    private String dogBreed;

    @Column(name = "dog_sex")
    private Character dogSex;

    @Column(name = "dog_birth")
    private LocalDateTime dogBirth;

    @Column(name = "dog_nose_print")
    private String dogNosePrint;

    @Column(name = "dog_token_id")
    private Integer dogTokenId;

    @Column(name = "dog_img")
    private String dogImg;

    @Column(name = "dog_hash")
    private String dogHash;
}
