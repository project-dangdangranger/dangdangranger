package com.shield.dangdangranger.domain.dog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class DogRequestDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DogRegistRequestDto{
        private String dogName;
        private String dogBreed;
        private Character dogSex;
        private LocalDateTime dogBirth;
        private String dogNosePrint;
        private String dogImg;
        private String dogHash;
    }
}
