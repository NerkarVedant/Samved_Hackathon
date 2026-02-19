package com.Samved.Hackathon.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "areas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Area {
    @Id
    private String id;
    private String wardNumber;
    private String name;
}

