package com.shield.dangdangranger.domain.dog.service;

import com.shield.dangdangranger.domain.dog.constant.DogResponseMessage;
import com.shield.dangdangranger.domain.dog.dto.DogRequestDto.*;
import com.shield.dangdangranger.domain.dog.dto.DogResponseDto.*;
import com.shield.dangdangranger.domain.dog.entity.Dog;
import com.shield.dangdangranger.domain.dog.repo.DogRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DogServiceImpl implements DogService{
    private final DogRepository dogRepository;
    @Override
    public Dog registDog(Integer userNo, DogRegistRequestDto dogRegistRequestDto) {
        Dog newDog = Dog.builder()
                .dogRegistRequestDto(dogRegistRequestDto)
                .userNo(userNo).build();

        return dogRepository.save(newDog);
    }

    @Override
    public List<DogListResponseDto> getDogList(Integer userNo) {
        List<Dog> dogList = dogRepository.findAllByUserNoAndCanceled(userNo, BaseConstant.NOTCANCELED);
        return dogList.stream()
                .map(DogListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public DogInfoResponseDto getDogInfo(Integer dogNo) {
        Dog dog = dogRepository.findDogByDogNoAndCanceled(dogNo, BaseConstant.NOTCANCELED)
                .orElseThrow(() -> new NotFoundException(DogResponseMessage.DOG_INFO_READ_FAIL.getMessage()));
        return DogInfoResponseDto.builder()
                .dogNo(dog.getDogNo())
                .dogName(dog.getDogName())
                .dogBreed(dog.getDogBreed())
                .dogBirth(dog.getDogBirth())
                .dogSex(dog.getDogSex())
                .dogTokenId(dog.getDogTokenId())
                .dogImg(dog.getDogImg()).build();
    }
}
