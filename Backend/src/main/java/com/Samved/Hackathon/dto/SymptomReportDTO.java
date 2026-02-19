package com.Samved.Hackathon.dto;

import com.Samved.Hackathon.entity.enums.Severity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SymptomReportDTO {
    @NotBlank
    private String areaId;

    @NotBlank
    private String symptom;

    @NotNull
    private Severity severity;
}

