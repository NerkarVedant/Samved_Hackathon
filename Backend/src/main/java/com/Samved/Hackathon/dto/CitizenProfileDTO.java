package com.Samved.Hackathon.dto;

import com.Samved.Hackathon.entity.enums.Gender;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CitizenProfileDTO {
    @NotNull
    private Integer age;

    @NotNull
    private Gender gender;

    private String phoneNumber;
    private String address;
}

