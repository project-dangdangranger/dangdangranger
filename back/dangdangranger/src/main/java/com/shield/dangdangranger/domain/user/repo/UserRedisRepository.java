package com.shield.dangdangranger.domain.user.repo;

import com.shield.dangdangranger.domain.user.entity.UserInfo;
import org.springframework.data.repository.CrudRepository;

public interface UserRedisRepository extends CrudRepository<UserInfo, Integer> {

}
