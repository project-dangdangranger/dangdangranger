package com.shield.dangdangranger.domain.dog.service;

import com.shield.dangdangranger.domain.dog.dto.DogRequestDto.*;
import com.shield.dangdangranger.domain.dog.dto.DogResponseDto.*;
import com.shield.dangdangranger.domain.dog.entity.Breed;
import com.shield.dangdangranger.domain.dog.entity.Dog;
import com.shield.dangdangranger.domain.dog.entity.Script;

import java.util.List;

public interface DogService {
    Dog registDog(Integer userNo, DogRegistRequestDto dogRegistRequestDto);

    List<DogListResponseDto> getDogList(Integer userNo);

    DogInfoResponseDto getDogInfo(Integer dogNo);

    List<Breed> selectAllBreeds();

    List<Breed> selectAllBreedsByKeyword(String keyword);

    RandomScriptResponseDto selectRandomScript();
}
