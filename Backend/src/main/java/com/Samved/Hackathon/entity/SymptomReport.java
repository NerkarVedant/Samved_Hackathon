package com.Samved.Hackathon.entity;

import com.Samved.Hackathon.entity.enums.Severity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Document(collection = "symptom_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SymptomReport {

    @Id
    private String id;

    @DBRef
    private User reportedBy;

    @DBRef
    private Area area;

    private String symptom;

    private Severity severity; // LOW, HIGH

    private LocalDateTime reportedAt;
}

