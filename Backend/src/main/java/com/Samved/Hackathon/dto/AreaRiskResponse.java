package com.Samved.Hackathon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AreaRiskResponse {
    private Long totalReports;
    private Long highSeverityReports;
    private String riskLevel;
}

