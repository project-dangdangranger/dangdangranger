package com.shield.dangdangranger.domain.missing.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.shield.dangdangranger.domain.missing.dto.MissingRequestDto.MissingUpdateRequestDto;
import com.shield.dangdangranger.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "missing")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Missing extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "missing_no")
	private Integer missingNo;
	
	@Column(name = "missing_type_no")
    private Integer missingTypeNo;
	
	@Column(name = "dog_no")
    private Integer dogNo;
	
	@Column(name = "user_no")
    private Integer userNo;
	
	@Column(name = "missing_title")
	private String missingTitle;
	
	@Column(name = "missing_content")
    private String missingContent;
	
	@Column(name = "missing_date")
    private LocalDateTime missingDate;
	
	@Column(name = "missing_lat")
    private Double missingLat;
	
	@Column(name = "missing_lng")
    private Double missingLng;
	
	@Column(name = "missing_status")
    private Integer missingStatus = 0;

	@Builder
	public Missing(Integer missingNo, Integer missingTypeNo, Integer dogNo, Integer userNo, String missingContent,
			LocalDateTime missingDate, Double missingLat, Double missingLng, String missingTitle) {
		this.missingNo = missingNo;
		this.missingTypeNo = missingTypeNo;
		this.dogNo = dogNo;
		this.userNo = userNo;
		this.missingTitle = missingTitle;
		this.missingContent = missingContent;
		this.missingDate = missingDate;
		this.missingLat = missingLat;
		this.missingLng = missingLng;
	}
	
	public void updateMissing(MissingUpdateRequestDto dto) {
        this.missingTitle = dto.getMissingTitle();
        this.missingContent = dto.getMissingContent();
		this.missingDate = dto.getMissingDate();
		this.missingLat = dto.getMissingLat();
		this.missingLng = dto.getMissingLng();
	}
}
