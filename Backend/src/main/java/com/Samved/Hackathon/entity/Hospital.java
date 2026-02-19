package com.Samved.Hackathon.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hospitals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {
    @Id
    private String id;

    private String name;

    @DBRef
    private Area area;

    private Integer totalBeds;
    private Integer availableBeds;
}
