package com.Samved.Hackathon.dto;

import com.Samved.Hackathon.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String message;

    private String userId;

    private String username;

    private String email;

    private Role role;

    private String token;

    public AuthResponse(String message) {
        this.message = message;
    }
}

