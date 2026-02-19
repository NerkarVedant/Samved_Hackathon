package com.Samved.Hackathon.controller;

import com.Samved.Hackathon.dto.HospitalDTO;
import com.Samved.Hackathon.entity.Hospital;
import com.Samved.Hackathon.service.HospitalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HospitalController {
    private final HospitalService hospitalService;

    @GetMapping
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        return ResponseEntity.ok(hospitalService.getAllHospitals());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<Hospital> createHospital(@Valid @RequestBody HospitalDTO dto) {
        return ResponseEntity.ok(hospitalService.createHospital(dto));
    }
}

