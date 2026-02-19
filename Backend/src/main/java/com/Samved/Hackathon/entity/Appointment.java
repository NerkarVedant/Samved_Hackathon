package com.Samved.Hackathon.entity;

import com.Samved.Hackathon.entity.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;

@Document(collection = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    private String id;

    @DBRef
    private User citizen; // Reference to User with CITIZEN role

    @DBRef
    private Doctor doctor;

    @DBRef
    private Hospital hospital;

    private LocalDateTime appointmentDateTime;

    private AppointmentStatus status; // BOOKED, COMPLETED, CANCELLED

    private LocalDateTime createdAt;
}

