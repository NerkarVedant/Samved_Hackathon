package com.Samved.Hackathon.repository;

import com.Samved.Hackathon.entity.Hospital;
import com.Samved.Hackathon.entity.Area;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends MongoRepository<Hospital, String> {

    List<Hospital> findByArea(Area area);
}

