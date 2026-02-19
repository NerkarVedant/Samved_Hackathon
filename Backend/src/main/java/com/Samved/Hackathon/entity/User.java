package com.Samved.Hackathon.entity;

import com.Samved.Hackathon.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id; // MongoDB will generate this as UUID-like ObjectId

    @Indexed(unique = true)
    private String username;

    @Indexed(unique = true)
    private String email;

    private String password; // BCrypt encrypted

    private Role role; // SUPER_ADMIN, HOSPITAL_ADMIN, DOCTOR, CITIZEN

    @DBRef
    private Area area; // ManyToOne relationship

    private LocalDateTime createdAt;

    private boolean active = true;
}

