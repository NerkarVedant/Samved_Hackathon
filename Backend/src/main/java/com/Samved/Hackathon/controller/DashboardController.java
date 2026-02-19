package com.Samved.Hackathon.controller;

import com.Samved.Hackathon.dto.AreaRiskResponse;
import com.Samved.Hackathon.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/area-risk/{areaId}")
    public ResponseEntity<AreaRiskResponse> getAreaRisk(@PathVariable String areaId) {
        return ResponseEntity.ok(dashboardService.getAreaRisk(areaId));
    }
}

