package com.shield.dangdangranger.domain.user.entity;

import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.domain.user.constant.UserRole;
import com.shield.dangdangranger.global.entity.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
import lombok.ToString;

@Entity
@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
    private Integer userNo;

    private String userEmail;

    private String userName;

    private String userProfileImg;

    @Enumerated(value = EnumType.STRING)
    private UserRole userRole;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_code")
    private Dong dong;

    private String userWalletAddress;

    private String userWalletPw;

    @Builder
    public User(Integer userNo, String userEmail, String userName,
        String userProfileImg, UserRole userRole, Dong dong,
        String userWalletAddress, String userWalletPw) {
        this.userNo = userNo;
        this.userEmail = userEmail;
        this.userName = userName;
        this.userProfileImg = userProfileImg;
        this.userRole = userRole;
        this.dong = dong;
        this.userWalletAddress = userWalletAddress;
        this.userWalletPw = userWalletPw;
    }

    public void updateUserInfo(String userName, Dong dong, String userProfileImg) {
        this.userName = userName;
        this.dong = dong;
        this.userProfileImg = userProfileImg;
    }
}
