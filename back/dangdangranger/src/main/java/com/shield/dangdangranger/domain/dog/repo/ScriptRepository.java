package com.shield.dangdangranger.domain.dog.repo;

import com.shield.dangdangranger.domain.dog.entity.Script;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ScriptRepository extends JpaRepository<Script, Integer> {
    @Query(value = "SELECT * FROM script WHERE canceled = 0 ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<Script> findRandomScript();
}
