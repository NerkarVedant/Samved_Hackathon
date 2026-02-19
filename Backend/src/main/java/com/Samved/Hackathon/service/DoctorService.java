package com.Samved.Hackathon.service;

import com.Samved.Hackathon.dto.DoctorDTO;
import com.Samved.Hackathon.entity.Doctor;
import com.Samved.Hackathon.entity.Hospital;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.entity.enums.Role;
import com.Samved.Hackathon.repository.DoctorRepository;
import com.Samved.Hackathon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final HospitalService hospitalService;

    public Doctor createDoctor(DoctorDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));

        if (user.getRole() != Role.DOCTOR) {
            throw new RuntimeException("User must have DOCTOR role");
        }

        Hospital hospital = hospitalService.getHospitalById(dto.getHospitalId());

        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setHospital(hospital);
        doctor.setSpecialization(dto.getSpecialization());

        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(String id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }
}

