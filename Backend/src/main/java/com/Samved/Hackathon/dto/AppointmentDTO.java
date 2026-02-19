package com.Samved.Hackathon.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentDTO {
    @NotBlank
    private String doctorId;

    @NotBlank
    private String hospitalId;

    @NotNull
    private LocalDateTime appointmentDateTime;
}

