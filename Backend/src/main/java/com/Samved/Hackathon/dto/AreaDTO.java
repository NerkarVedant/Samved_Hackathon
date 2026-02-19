package com.Samved.Hackathon.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AreaDTO {
    @NotBlank
    private String wardNumber;

    @NotBlank
    private String name;
}

