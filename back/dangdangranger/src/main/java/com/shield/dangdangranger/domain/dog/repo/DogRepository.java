package com.shield.dangdangranger.domain.dog.repo;

import com.shield.dangdangranger.domain.dog.entity.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DogRepository extends JpaRepository<Dog, Integer> {
    List<Dog> findAllByUserNoAndCanceled(Integer userNo, Integer canceled);

    Optional<Dog> findDogByDogNoAndCanceled(Integer dogNo, Integer canceled);
}
