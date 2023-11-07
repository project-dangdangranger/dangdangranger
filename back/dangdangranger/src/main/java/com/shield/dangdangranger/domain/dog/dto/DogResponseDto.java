package com.shield.dangdangranger.domain.dog.dto;

import com.shield.dangdangranger.domain.dog.entity.Dog;
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

        public DogListResponseDto(Dog dog){
            this.dogNo = dog.getDogNo();
            this.dogName = dog.getDogName();
            this.dogBreed = dog.getDogBreed();
            this.dogSex = dog.getDogSex();
            this.dogTokenId = dog.getDogTokenId();
            this.dogImg = dog.getDogImg();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class DogInfoResponseDto{
        private Integer dogNo;
        private String dogName;
        private String dogBreed;
        private Character dogSex;
        private LocalDateTime dogBirth;
        private Integer dogTokenId;
        private String dogImg;
        private LocalDateTime createDate;
    }
}
