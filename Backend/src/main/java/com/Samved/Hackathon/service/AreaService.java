package com.Samved.Hackathon.service;

import com.Samved.Hackathon.dto.AreaDTO;
import com.Samved.Hackathon.entity.Area;
import com.Samved.Hackathon.repository.AreaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AreaService {
    private final AreaRepository areaRepository;

    public Area createArea(AreaDTO dto) {
        Area area = new Area();
        area.setWardNumber(dto.getWardNumber());
        area.setName(dto.getName());
        return areaRepository.save(area);
    }

    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    public Area getAreaById(String id) {
        return areaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Area not found with id: " + id));
    }
}

