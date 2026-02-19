package com.Samved.Hackathon.controller;

import com.Samved.Hackathon.dto.AppointmentDTO;
import com.Samved.Hackathon.entity.Appointment;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.entity.enums.AppointmentStatus;
import com.Samved.Hackathon.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping
    @PreAuthorize("hasAuthority('CITIZEN')")
    public ResponseEntity<Appointment> createAppointment(
            @Valid @RequestBody AppointmentDTO dto,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.createAppointment(dto, user));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Appointment>> getMyAppointments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.getMyAppointments(user));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('DOCTOR')")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable String id,
            @RequestParam AppointmentStatus status) {
        return ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, status));
    }
}

