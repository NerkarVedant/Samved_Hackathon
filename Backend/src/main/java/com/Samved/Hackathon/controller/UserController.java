package com.Samved.Hackathon.controller;

import com.Samved.Hackathon.dto.AuthResponse;
import com.Samved.Hackathon.dto.CitizenProfileDTO;
import com.Samved.Hackathon.dto.LoginRequest;
import com.Samved.Hackathon.dto.SignupRequest;
import com.Samved.Hackathon.entity.CitizenProfile;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.service.CitizenProfileService;
import com.Samved.Hackathon.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CitizenProfileService citizenProfileService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
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
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
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

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
        try {
            Optional<User> user = userService.getUserById(userId);

            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AuthResponse("User not found"));
            }

            // Remove password before sending response
            User userResponse = user.get();
            userResponse.setPassword(null);

            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("An error occurred: " + e.getMessage()));
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            Optional<User> user = userService.getUserByEmail(email);

            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AuthResponse("User not found"));
            }

            // Remove password before sending response
            User userResponse = user.get();
            userResponse.setPassword(null);

            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("An error occurred: " + e.getMessage()));
        }
    }

    @PostMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @Valid @RequestBody CitizenProfileDTO dto,
            @AuthenticationPrincipal User user) {
        try {
            CitizenProfile profile = citizenProfileService.createOrUpdateProfile(dto, user);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("An error occurred: " + e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal User user) {
        try {
            CitizenProfile profile = citizenProfileService.getProfileByUser(user);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new AuthResponse("Profile not found: " + e.getMessage()));
        }
    }
}

