package com.Samved.Hackathon.controller;

import com.Samved.Hackathon.dto.AuthResponse;
import com.Samved.Hackathon.dto.LoginRequest;
import com.Samved.Hackathon.dto.SignupRequest;
import com.Samved.Hackathon.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody SignupRequest request) {
        try {
            AuthResponse response = userService.signup(request);

            if (response.getMessage().contains("already registered")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("An error occurred during signup: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = userService.login(request);

            if (response.getMessage().contains("Invalid") || response.getMessage().contains("deactivated")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("An error occurred during login: " + e.getMessage()));
        }
    }
}

