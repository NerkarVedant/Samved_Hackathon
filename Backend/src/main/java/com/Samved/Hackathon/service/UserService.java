package com.Samved.Hackathon.service;

import com.Samved.Hackathon.dto.AuthResponse;
import com.Samved.Hackathon.dto.LoginRequest;
import com.Samved.Hackathon.dto.SignupRequest;
import com.Samved.Hackathon.entity.Area;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.entity.enums.Role;
import com.Samved.Hackathon.repository.AreaRepository;
import com.Samved.Hackathon.repository.UserRepository;
import com.Samved.Hackathon.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AreaRepository areaRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse signup(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse("Email already registered");
        }

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse("Username already taken");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Set role to CITIZEN by default if not provided
        user.setRole(request.getRole() != null ? request.getRole() : Role.CITIZEN);

        // Set area if provided
        if (request.getAreaId() != null && !request.getAreaId().isEmpty()) {
            Optional<Area> area = areaRepository.findById(request.getAreaId());
            area.ifPresent(user::setArea);
        }

        user.setCreatedAt(LocalDateTime.now());
        user.setActive(true);

        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());

        return new AuthResponse(
            "User registered successfully",
            savedUser.getId(),
            savedUser.getUsername(),
            savedUser.getEmail(),
            savedUser.getRole(),
            token
        );
    }

    public AuthResponse login(LoginRequest request) {
        logger.info("Processing login request for email: {}", request.getEmail());

        // Find user by email from MongoDB
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            logger.warn("Login failed: User not found - {}", request.getEmail());
            return new AuthResponse("Invalid email or password");
        }

        User user = userOptional.get();
        logger.info("User found in MongoDB with role: {}", user.getRole());

        // Check if user is active
        if (!user.isActive()) {
            logger.warn("Login failed: Account deactivated - {}", request.getEmail());
            return new AuthResponse("Account is deactivated");
        }

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            logger.warn("Login failed: Invalid password - {}", request.getEmail());
            return new AuthResponse("Invalid email or password");
        }

        logger.info("Login successful for user: {} with role: {}", request.getEmail(), user.getRole());

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponse(
            "Login successful",
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            token
        );
    }

    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}

