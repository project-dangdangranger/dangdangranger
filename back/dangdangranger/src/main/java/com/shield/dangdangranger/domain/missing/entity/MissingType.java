package com.shield.dangdangranger.domain.missing.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.shield.dangdangranger.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "missing_type")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MissingType extends BaseEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "missing_type_no")
	private Integer missingTypeNo;
	
	private String missingTypeName;
	
	@Builder
	public MissingType(Integer missingTypeNo, String missingTypeName) {
		this.missingTypeNo = missingTypeNo;
		this.missingTypeName = missingTypeName;
	}
}
