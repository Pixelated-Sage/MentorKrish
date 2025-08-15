package com.mentor.backend.service;

import com.mentor.backend.dto.AnnouncementRequest;
import com.mentor.backend.dto.AnnouncementResponse;
import com.mentor.backend.entity.Announcement;
import com.mentor.backend.exception.ResourceNotFoundException;
import com.mentor.backend.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementResponse create(AnnouncementRequest request) {
        LocalDate parsedDate;
        LocalTime parsedTime;

        try {
            parsedDate = LocalDate.parse(request.getDate());
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format. Use yyyy-MM-dd");
        }

        try {
            parsedTime = LocalTime.parse(request.getTime());
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid time format. Use HH:mm or HH:mm:ss");
        }

        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .date(parsedDate)
                .time(parsedTime)
                .build();

        return mapToResponse(announcementRepository.save(announcement));
    }

    public List<AnnouncementResponse> getAll() {
        return announcementRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AnnouncementResponse getById(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));
        return mapToResponse(announcement);
    }

    public AnnouncementResponse update(Long id, AnnouncementRequest request) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));

        try {
            announcement.setDate(LocalDate.parse(request.getDate()));
            announcement.setTime(LocalTime.parse(request.getTime()));
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date/time format");
        }

        announcement.setTitle(request.getTitle());
        announcement.setDescription(request.getDescription());
        announcement.setImageUrl(request.getImageUrl());

        return mapToResponse(announcementRepository.save(announcement));
    }

    public void delete(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));
        announcementRepository.delete(announcement);
    }

    private AnnouncementResponse mapToResponse(Announcement announcement) {
        String imagePath = null;
        if (announcement.getImageUrl() != null && !announcement.getImageUrl().isBlank()) {
            imagePath = "/uploads/" + announcement.getImageUrl();
        }

        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .description(announcement.getDescription())
                .imageUrl(imagePath)
                .date(announcement.getDate().toString())
                .time(announcement.getTime().toString())
                .createdAt(announcement.getCreatedAt())
                .updatedAt(announcement.getUpdatedAt())
                .build();
    }
}
