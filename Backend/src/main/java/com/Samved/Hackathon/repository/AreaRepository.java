package com.Samved.Hackathon.repository;

import com.Samved.Hackathon.entity.Area;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AreaRepository extends MongoRepository<Area, String> {

    Optional<Area> findByWardNumber(String wardNumber);

    boolean existsByWardNumber(String wardNumber);
}

