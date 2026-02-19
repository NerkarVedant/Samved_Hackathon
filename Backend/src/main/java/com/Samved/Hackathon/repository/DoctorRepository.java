package com.Samved.Hackathon.repository;

import com.Samved.Hackathon.entity.Doctor;
import com.Samved.Hackathon.entity.Hospital;
import com.Samved.Hackathon.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {

    Optional<Doctor> findByUser(User user);

    List<Doctor> findByHospital(Hospital hospital);

    List<Doctor> findBySpecialization(String specialization);
}

