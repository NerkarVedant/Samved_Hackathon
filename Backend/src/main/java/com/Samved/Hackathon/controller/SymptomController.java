package com.Samved.Hackathon.controller;

import com.Samved.Hackathon.dto.SymptomReportDTO;
import com.Samved.Hackathon.entity.SymptomReport;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.service.SymptomReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/symptoms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SymptomController {
    private final SymptomReportService symptomReportService;

    @PostMapping("/report")
    @PreAuthorize("hasAnyAuthority('CITIZEN', 'DOCTOR')")
    public ResponseEntity<SymptomReport> reportSymptom(
            @Valid @RequestBody SymptomReportDTO dto,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(symptomReportService.createReport(dto, user));
    }

    @GetMapping("/area/{areaId}")
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<List<SymptomReport>> getSymptomsByArea(@PathVariable String areaId) {
        return ResponseEntity.ok(symptomReportService.getReportsByArea(areaId));
    }
}

