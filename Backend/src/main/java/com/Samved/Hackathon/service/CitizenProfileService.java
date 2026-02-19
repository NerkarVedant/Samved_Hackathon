package com.Samved.Hackathon.service;

import com.Samved.Hackathon.dto.CitizenProfileDTO;
import com.Samved.Hackathon.entity.CitizenProfile;
import com.Samved.Hackathon.entity.User;
import com.Samved.Hackathon.repository.CitizenProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CitizenProfileService {
    private final CitizenProfileRepository citizenProfileRepository;

    public CitizenProfile createOrUpdateProfile(CitizenProfileDTO dto, User user) {
        CitizenProfile profile = citizenProfileRepository.findByUser(user)
                .orElse(new CitizenProfile());

        profile.setUser(user);
        profile.setAge(dto.getAge());
        profile.setGender(dto.getGender());
        profile.setPhoneNumber(dto.getPhoneNumber());
        profile.setAddress(dto.getAddress());

        return citizenProfileRepository.save(profile);
    }

    public CitizenProfile getProfileByUser(User user) {
        return citizenProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Citizen profile not found for user: " + user.getUsername()));
    }
}

