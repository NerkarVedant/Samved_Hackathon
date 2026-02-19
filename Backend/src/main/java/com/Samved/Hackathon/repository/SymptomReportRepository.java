package com.Samved.Hackathon.repository;

import com.Samved.Hackathon.entity.SymptomReport;
import com.Samved.Hackathon.entity.Area;
import com.Samved.Hackathon.entity.enums.Severity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SymptomReportRepository extends MongoRepository<SymptomReport, String> {

    List<SymptomReport> findByArea(Area area);

    List<SymptomReport> findByAreaAndReportedAtAfter(Area area, LocalDateTime after);

    List<SymptomReport> findByAreaAndSeverityAndReportedAtAfter(Area area, Severity severity, LocalDateTime after);

    long countByAreaAndReportedAtAfter(Area area, LocalDateTime after);

    long countByAreaAndSeverityAndReportedAtAfter(Area area, Severity severity, LocalDateTime after);
}

