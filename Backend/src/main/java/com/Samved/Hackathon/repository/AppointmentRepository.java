package com.Samved.Hackathon.repository;

import com.Samved.Hackathon.entity.Appointment;
import com.Samved.Hackathon.entity.Doctor;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.entity.enums.AppointmentStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {

    List<Appointment> findByCitizen(User citizen);

    List<Appointment> findByDoctor(Doctor doctor);

    List<Appointment> findByCitizenAndStatus(User citizen, AppointmentStatus status);
}

