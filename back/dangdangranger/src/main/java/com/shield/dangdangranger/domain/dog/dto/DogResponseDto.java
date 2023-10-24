package com.shield.dangdangranger.domain.dog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class DogResponseDto {
    @Getter
    @AllArgsConstructor
    @Builder
    public static class DogListResponseDto{
        private Integer dogNo;
        private String dogName;
        private String dogBreed;
        private Character dogSex;
        private Integer dogTokenId;
        private String dogImg;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DogDetailResponseDto{
        private Integer dogNo;
        private String dogName;
        private String dogBreed;
        private Character dogSex;
        private LocalDateTime dogBirth;
        private Integer dogTokenId;
        private String dogImg;
    }
}
