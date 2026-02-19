package com.Samved.Hackathon.service;

import com.Samved.Hackathon.dto.AppointmentDTO;
import com.Samved.Hackathon.entity.Appointment;
import com.Samved.Hackathon.entity.Doctor;
import com.Samved.Hackathon.entity.Hospital;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.entity.enums.AppointmentStatus;
import com.Samved.Hackathon.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final DoctorService doctorService;
    private final HospitalService hospitalService;

    public Appointment createAppointment(AppointmentDTO dto, User citizen) {
        Doctor doctor = doctorService.getDoctorById(dto.getDoctorId());
        Hospital hospital = hospitalService.getHospitalById(dto.getHospitalId());

        Appointment appointment = new Appointment();
        appointment.setCitizen(citizen);
        appointment.setDoctor(doctor);
        appointment.setHospital(hospital);
        appointment.setAppointmentDateTime(dto.getAppointmentDateTime());
        appointment.setStatus(AppointmentStatus.BOOKED);
        appointment.setCreatedAt(LocalDateTime.now());

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getMyAppointments(User citizen) {
        return appointmentRepository.findByCitizen(citizen);
    }

    public Appointment updateAppointmentStatus(String id, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
}

