package com.Samved.Hackathon.service;

import com.Samved.Hackathon.dto.HospitalDTO;
import com.Samved.Hackathon.entity.Area;
import com.Samved.Hackathon.entity.Hospital;
import com.Samved.Hackathon.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalService {
    private final HospitalRepository hospitalRepository;
    private final AreaService areaService;

    public Hospital createHospital(HospitalDTO dto) {
        Area area = areaService.getAreaById(dto.getAreaId());

        Hospital hospital = new Hospital();
        hospital.setName(dto.getName());
        hospital.setArea(area);
        hospital.setTotalBeds(dto.getTotalBeds());
        hospital.setAvailableBeds(dto.getAvailableBeds());

        return hospitalRepository.save(hospital);
    }

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Hospital getHospitalById(String id) {
        return hospitalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hospital not found with id: " + id));
    }
}

