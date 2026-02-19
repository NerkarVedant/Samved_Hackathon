package com.Samved.Hackathon.controller;

import com.Samved.Hackathon.dto.AreaDTO;
import com.Samved.Hackathon.entity.Area;
import com.Samved.Hackathon.service.AreaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/areas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AreaController {
    private final AreaService areaService;

    @GetMapping
    public ResponseEntity<List<Area>> getAllAreas() {
        return ResponseEntity.ok(areaService.getAllAreas());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SUPER_ADMIN')")
    public ResponseEntity<Area> createArea(@Valid @RequestBody AreaDTO dto) {
        return ResponseEntity.ok(areaService.createArea(dto));
    }
}

