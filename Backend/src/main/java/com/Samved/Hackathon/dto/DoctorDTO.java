package com.Samved.Hackathon.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DoctorDTO {
    @NotBlank
    private String userId;

    @NotBlank
    private String hospitalId;

    @NotBlank
    private String specialization;
}

