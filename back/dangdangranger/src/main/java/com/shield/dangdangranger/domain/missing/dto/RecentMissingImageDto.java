package com.shield.dangdangranger.domain.missing.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Builder
public class RecentMissingImageDto {

	Integer missingNo;
	String imageUrl;
}
