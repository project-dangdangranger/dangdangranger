package com.shield.dangdangranger.domain.dog.controller;

import com.shield.dangdangranger.domain.dog.constant.DogResponseMessage;
import com.shield.dangdangranger.domain.dog.dto.DogRequestDto.*;
import com.shield.dangdangranger.domain.dog.dto.DogResponseDto.*;
import com.shield.dangdangranger.domain.dog.service.DogService;
import com.shield.dangdangranger.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dog")
public class DogController {
    private final DogService dogService;

    @PostMapping()
    public ResponseEntity<ResponseDto<Object>> registDog(@RequestAttribute("userNo") Integer userNo, @RequestBody DogRegistRequestDto dogRegistRequestDto){
        dogService.registDog(userNo, dogRegistRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseDto.create(DogResponseMessage.DOG_REGIST_SUCCESS.getMessage()));
    }

    @GetMapping()
    public ResponseEntity<ResponseDto<List<DogListResponseDto>>> selectDogList(@RequestAttribute("userNo") Integer userNo){
        List<DogListResponseDto> dogList = dogService.getDogList(userNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(DogResponseMessage.DOG_LIST_READ_SUCCESS.getMessage(), dogList));
    }

    @GetMapping("/{dogNo}")
    public ResponseEntity<ResponseDto<DogInfoResponseDto>> selectDogInfo(@PathVariable Integer dogNo){
        DogInfoResponseDto dogInfoResponseDto = dogService.getDogInfo(dogNo);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDto.create(DogResponseMessage.DOG_INFO_READ_SUCCESS.getMessage(), dogInfoResponseDto));
    }
}
