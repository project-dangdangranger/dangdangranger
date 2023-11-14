package com.shield.dangdangranger.domain.region.repo;

import com.shield.dangdangranger.domain.region.entity.PostalAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostalAddressRepository extends JpaRepository<PostalAddress, String> {
    Optional<PostalAddress> findTopByPostalCode(String postalCode);
}
