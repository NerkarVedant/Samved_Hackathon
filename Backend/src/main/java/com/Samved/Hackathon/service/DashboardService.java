package com.Samved.Hackathon.service;

import com.Samved.Hackathon.dto.AreaRiskResponse;
import com.Samved.Hackathon.entity.Area;
import com.Samved.Hackathon.entity.enums.Severity;
import com.Samved.Hackathon.repository.SymptomReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final SymptomReportRepository symptomReportRepository;
    private final AreaService areaService;

    public AreaRiskResponse getAreaRisk(String areaId) {
        Area area = areaService.getAreaById(areaId);
        LocalDateTime fortyEightHoursAgo = LocalDateTime.now().minusHours(48);

        long totalReports = symptomReportRepository.countByAreaAndReportedAtAfter(area, fortyEightHoursAgo);
        long highSeverityReports = symptomReportRepository.countByAreaAndSeverityAndReportedAtAfter(
                area, Severity.HIGH, fortyEightHoursAgo);

        String riskLevel;
        if (highSeverityReports > 5) {
            riskLevel = "HIGH";
        } else if (totalReports > 5) {
            riskLevel = "MEDIUM";
        } else {
            riskLevel = "LOW";
        }

        return new AreaRiskResponse(totalReports, highSeverityReports, riskLevel);
    }
}

