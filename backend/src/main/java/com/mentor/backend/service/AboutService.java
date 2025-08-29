package com.mentor.backend.service;

import com.mentor.backend.dto.AboutRequest;
import com.mentor.backend.dto.AboutResponse;
import com.mentor.backend.entity.About;
import com.mentor.backend.exception.ResourceNotFoundException;
import com.mentor.backend.repository.AboutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AboutService {

    private final AboutRepository aboutRepository;

    public AboutResponse createOrUpdate(AboutRequest request) {
        About about = aboutRepository.findById(1L).orElse(new About());
        about.setId(1L); // ensure fixed id for singleton
        about.setContent(request.getContent() != null ? request.getContent() : "");
        about.setFounderName(request.getFounderName() != null ? request.getFounderName() : "");
        about.setFounderQuote(request.getFounderQuote() != null ? request.getFounderQuote() : "");
        About saved = aboutRepository.save(about);
        return mapToResponse(saved);
    }

    public List<AboutResponse> getAll() {
        return aboutRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AboutResponse updateAbout(Long id, AboutRequest request) {
        About about = aboutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("About", "id", id));

        about.setContent(request.getContent() != null ? request.getContent() : "");
        about.setFounderName(request.getFounderName() != null ? request.getFounderName() : "");
        about.setFounderQuote(request.getFounderQuote() != null ? request.getFounderQuote() : "");

        About updated = aboutRepository.save(about);
        return mapToResponse(updated);
    }

    public void deleteAbout(Long id) {
        About about = aboutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("About", "id", id));

        aboutRepository.delete(about);
    }

    private AboutResponse mapToResponse(About about) {
        return AboutResponse.builder()
                .id(about.getId())
                .content(about.getContent())
                .founderName(about.getFounderName())
                .founderQuote(about.getFounderQuote())
                .build();
    }

    public AboutResponse getLatest() {
        return aboutRepository.findById(1L)
                .map(this::mapToResponse)
                .orElse(null);
    }
}
