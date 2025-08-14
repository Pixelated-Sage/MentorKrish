package com.mentor.backend.service;

import com.mentor.backend.dto.GalleryRequest;
import com.mentor.backend.entity.Gallery;
import com.mentor.backend.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;

    public Gallery createWithImage(GalleryRequest req, byte[] imageBytes, String imageType) {
        Gallery gallery = Gallery.builder()
                .title(req.getTitle())
                .subtitle(req.getSubtitle())
                .description(req.getDescription())
                .tag(req.getTag())
                .layoutType(req.getLayoutType())
                .build();
        return galleryRepository.save(gallery);
    }

    public List<Gallery> getAll() {
        return galleryRepository.findAll();
    }

    public Gallery getById(Long id) {
        return galleryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Gallery item not found with id: " + id));
    }

    public Gallery update(Long id, GalleryRequest req) {
        Gallery existing = getById(id);
        if (req.getTitle() != null) existing.setTitle(req.getTitle());
        if (req.getSubtitle() != null) existing.setSubtitle(req.getSubtitle());
        if (req.getDescription() != null) existing.setDescription(req.getDescription());
        if (req.getTag() != null) existing.setTag(req.getTag());
        if (req.getLayoutType() != null) existing.setLayoutType(req.getLayoutType());
        return galleryRepository.save(existing);
    }

    public void delete(Long id) {
        galleryRepository.delete(getById(id));
    }
    public Gallery create(Gallery gallery) {
        return galleryRepository.save(gallery);
    }
}
