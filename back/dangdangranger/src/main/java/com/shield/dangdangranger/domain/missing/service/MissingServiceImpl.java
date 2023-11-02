package com.shield.dangdangranger.domain.missing.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shield.dangdangranger.domain.missing.repo.MissingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MissingServiceImpl implements MissingService {
	
	private final MissingRepository missingRepository;

	@Override
	public int getLocalMissingDogCount(Integer userNo) {
		
		return (int) missingRepository.countByDongCode(userNo);
	}

}
