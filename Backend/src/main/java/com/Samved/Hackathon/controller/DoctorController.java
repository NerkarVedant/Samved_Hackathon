package com.Samved.Hackathon.controller;

import com.Samved.Hackathon.dto.DoctorDTO;
import com.Samved.Hackathon.entity.Doctor;
import com.Samved.Hackathon.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('HOSPITAL_ADMIN')")
    public ResponseEntity<Doctor> createDoctor(@Valid @RequestBody DoctorDTO dto) {
        return ResponseEntity.ok(doctorService.createDoctor(dto));
    }
}

