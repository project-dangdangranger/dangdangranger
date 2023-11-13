package com.shield.dangdangranger.domain.missing.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.shield.dangdangranger.domain.missing.dto.SearchReportRequestDto.SearchReportUpdateRequestDto;
import com.shield.dangdangranger.global.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "search_report")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class SearchReport extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "search_report_no")
	private Integer searchReportNo;
	
	@Column(name = "missing_no")
	private Integer missingNo;
	
	@Column(name = "user_no")
    private Integer userNo;
	
	@Column(name = "search_report_content")
	private String searchReportContent;
	
	@Column(name = "search_report_lat")
    private Double searchReportLat;
	
	@Column(name = "search_report_lng")
    private Double searchReportLng;

	@Builder
	public SearchReport(Integer searchReportNo, Integer missingNo, Integer userNo, String searchReportContent,
			Double searchReportLat, Double searchReportLng) {
		this.searchReportNo = searchReportNo;
		this.missingNo = missingNo;
		this.userNo = userNo;
		this.searchReportContent = searchReportContent;
		this.searchReportLat = searchReportLat;
		this.searchReportLng = searchReportLng;
	}

	public void updateSearchReport(SearchReportUpdateRequestDto searchReportUpdateRequestDto) {
		this.searchReportContent = searchReportUpdateRequestDto.getSearchReportContent();
		this.searchReportLat = searchReportUpdateRequestDto.getSearchReportLat();
		this.searchReportLng = searchReportUpdateRequestDto.getSearchReportLng();
		
	}
	
}
