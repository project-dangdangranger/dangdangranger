package com.shield.dangdangranger.domain.dog.service;

import com.shield.dangdangranger.domain.dog.dto.DogRequestDto.*;
import com.shield.dangdangranger.domain.dog.dto.DogResponseDto.*;
import com.shield.dangdangranger.domain.dog.entity.Breed;
import com.shield.dangdangranger.domain.dog.entity.Dog;
import com.shield.dangdangranger.domain.dog.repo.BreedRepository;
import com.shield.dangdangranger.domain.dog.repo.DogRepository;
import com.shield.dangdangranger.global.constant.BaseConstant;
import com.shield.dangdangranger.global.error.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.shield.dangdangranger.domain.dog.constant.DogResponseMessage.BREED_NOT_FOUND_EXCEPTION;
import static com.shield.dangdangranger.domain.dog.constant.DogResponseMessage.DOG_INFO_READ_FAIL;


@Service
@RequiredArgsConstructor
public class DogServiceImpl implements DogService{
    private final DogRepository dogRepository;
    private final BreedRepository breedRepository;

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
                .orElseThrow(() -> new NotFoundException(DOG_INFO_READ_FAIL.getMessage()));
        return DogInfoResponseDto.builder()
                .dogNo(dog.getDogNo())
                .dogName(dog.getDogName())
                .dogBreed(dog.getDogBreed())
                .dogBirth(dog.getDogBirth())
                .dogSex(dog.getDogSex())
                .dogTokenId(dog.getDogTokenId())
                .dogImg(dog.getDogImg()).build();
    }

    @Override
    public List<Breed> selectAllBreeds() {
        List<Breed> breedList = breedRepository.findAll();
        return breedList;
    }

    @Override
    public List<Breed> selectAllBreedsByKeyword(String keyword) {
        List<Breed> breedList = breedRepository.findBreedsByBreedNameContaining(keyword);
        if(breedList.size() == 0){
            throw new NotFoundException(BREED_NOT_FOUND_EXCEPTION.getMessage());
        }

        return breedList;
    }
}
