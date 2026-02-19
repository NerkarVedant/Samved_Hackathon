package com.Samved.Hackathon.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class HospitalDTO {
    @NotBlank
    private String name;

    @NotBlank
    private String areaId;

    @NotNull
    private Integer totalBeds;

    @NotNull
    private Integer availableBeds;
}

