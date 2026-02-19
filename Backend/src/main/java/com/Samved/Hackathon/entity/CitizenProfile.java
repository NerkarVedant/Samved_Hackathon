package com.Samved.Hackathon.entity;

import com.Samved.Hackathon.entity.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection = "citizen_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitizenProfile {

    @Id
    private String id;

    @DBRef
    private User user; // OneToOne relationship

    private Integer age;

    private Gender gender;

    private String phoneNumber;

    private String address;
}

