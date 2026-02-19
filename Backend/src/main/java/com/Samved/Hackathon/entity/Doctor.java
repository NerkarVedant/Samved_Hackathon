package com.Samved.Hackathon.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    private String id;

    @DBRef
    private User user; // OneToOne relationship

    @DBRef
    private Hospital hospital; // ManyToOne relationship

    private String specialization;
}

