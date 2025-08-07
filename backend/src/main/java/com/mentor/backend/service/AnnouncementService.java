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
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementResponse createAnnouncement(AnnouncementRequest request) {
        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .date(LocalDate.parse(request.getDate()))
                .time(LocalTime.parse(request.getTime()))
                .build();

        Announcement saved = announcementRepository.save(announcement);

        return mapToResponse(saved);
    }

    public List<AnnouncementResponse> getAllAnnouncements() {
        return announcementRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AnnouncementResponse getAnnouncementById(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));
        return mapToResponse(announcement);
    }

    public AnnouncementResponse updateAnnouncement(Long id, AnnouncementRequest request) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));

        announcement.setTitle(request.getTitle());
        announcement.setDescription(request.getDescription());
        announcement.setImageUrl(request.getImageUrl());
        announcement.setDate(LocalDate.parse(request.getDate()));
        announcement.setTime(LocalTime.parse(request.getTime()));

        Announcement updated = announcementRepository.save(announcement);
        return mapToResponse(updated);
    }

    public void deleteAnnouncement(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));
        announcementRepository.delete(announcement);
    }

    private AnnouncementResponse mapToResponse(Announcement announcement) {
        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .description(announcement.getDescription())
                .imageUrl(announcement.getImageUrl())
                .date(announcement.getDate().toString())
                .time(announcement.getTime().toString())
                .createdAt(announcement.getCreatedAt())
                .updatedAt(announcement.getUpdatedAt())
                .build();
    }
}
