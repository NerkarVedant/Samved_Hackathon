package com.Samved.Hackathon.service;

import com.Samved.Hackathon.dto.SymptomReportDTO;
import com.Samved.Hackathon.entity.Area;
import com.Samved.Hackathon.entity.SymptomReport;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.repository.SymptomReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SymptomReportService {
    private final SymptomReportRepository symptomReportRepository;
    private final AreaService areaService;

    public SymptomReport createReport(SymptomReportDTO dto, User reporter) {
        Area area = areaService.getAreaById(dto.getAreaId());

        SymptomReport report = new SymptomReport();
        report.setReportedBy(reporter);
        report.setArea(area);
        report.setSymptom(dto.getSymptom());
        report.setSeverity(dto.getSeverity());
        report.setReportedAt(LocalDateTime.now());

        return symptomReportRepository.save(report);
    }

    public List<SymptomReport> getReportsByArea(String areaId) {
        Area area = areaService.getAreaById(areaId);
        return symptomReportRepository.findByArea(area);
    }
}

