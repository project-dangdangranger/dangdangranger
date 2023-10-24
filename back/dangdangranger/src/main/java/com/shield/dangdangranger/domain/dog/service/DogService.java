package com.shield.dangdangranger.domain.dog.service;

import com.shield.dangdangranger.domain.dog.dto.DogRequestDto.*;
import com.shield.dangdangranger.domain.dog.dto.DogResponseDto.*;
import com.shield.dangdangranger.domain.dog.entity.Dog;

import java.util.List;

public interface DogService {
    Dog registDog(Integer userNo, DogRegistRequestDto dogRegistRequestDto);

    List<DogListResponseDto> getDogList(Integer userNo);

    DogInfoResponseDto getDogInfo(Integer dogNo);
}
