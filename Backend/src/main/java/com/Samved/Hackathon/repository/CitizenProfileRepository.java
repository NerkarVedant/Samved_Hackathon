package com.Samved.Hackathon.repository;

import com.Samved.Hackathon.entity.CitizenProfile;
import com.Samved.Hackathon.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CitizenProfileRepository extends MongoRepository<CitizenProfile, String> {

    Optional<CitizenProfile> findByUser(User user);
}

