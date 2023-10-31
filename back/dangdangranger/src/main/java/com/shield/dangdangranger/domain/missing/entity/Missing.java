package com.shield.dangdangranger.domain.missing.entity;

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

import com.shield.dangdangranger.domain.dog.entity.Dog;
import com.shield.dangdangranger.domain.region.entity.Dong;
import com.shield.dangdangranger.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "missing")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Missing extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "missing_no")
	private Integer missingNo;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "missing_type_no")
    private MissingType missingType;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dog_no")
    private Dog dog;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dong_code")
    private Dong dong;
	
	@Column(name = "missing_content")
    private String missingContent;
	
	@Column(name = "missing_date")
    private LocalDateTime missingDate;
	
	@Column(name = "missing_lat")
    private Double missingLat;
	
	@Column(name = "missing_lng")
    private Double missingLng;
	
	@Column(name = "missing_status")
    private Integer missingStatus;

	@Builder
	public Missing(Integer missingNo, MissingType missingType, Dog dog, Dong dong, String missingContent,
			LocalDateTime missingDate, Double missingLat, Double missingLng, Integer missingStatus) {
		this.missingNo = missingNo;
		this.missingType = missingType;
		this.dog = dog;
		this.dong = dong;
		this.missingContent = missingContent;
		this.missingDate = missingDate;
		this.missingLat = missingLat;
		this.missingLng = missingLng;
		this.missingStatus = missingStatus;
	}
}
