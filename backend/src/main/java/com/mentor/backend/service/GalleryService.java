package com.mentor.backend.service;

import com.mentor.backend.dto.GalleryRequest;
import com.mentor.backend.entity.Gallery;
import com.mentor.backend.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;

    // upload directory (configure in application.properties)
    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public Gallery createFromDto(GalleryRequest req) {
        Gallery g = Gallery.builder()
                .title(req.getTitle())
                .subtitle(req.getSubtitle())
                .description(req.getDescription())
                .imageUrl(req.getImageUrl())
                .tag(req.getTag())
                .layoutType(req.getLayoutType())
                .build();
        return galleryRepository.save(g);
    }

    public List<Gallery> getAll() {
        return galleryRepository.findAll();
    }

    public Gallery getById(Long id) {
        return galleryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Gallery item not found with id: " + id));
    }

    public Gallery update(Long id, GalleryRequest req) {
        Gallery existing = getById(id);
        if (req.getTitle() != null) existing.setTitle(req.getTitle());
        if (req.getSubtitle() != null) existing.setSubtitle(req.getSubtitle());
        if (req.getDescription() != null) existing.setDescription(req.getDescription());
        if (req.getImageUrl() != null) existing.setImageUrl(req.getImageUrl());
        if (req.getTag() != null) existing.setTag(req.getTag());
        if (req.getLayoutType() != null) existing.setLayoutType(req.getLayoutType());
        return galleryRepository.save(existing);
    }

    public void delete(Long id) {
        Gallery g = getById(id);
        // Try to remove file from disk (best-effort)
        if (g.getFilename() != null) {
            try {
                Path p = Paths.get(uploadDir).toAbsolutePath().resolve(g.getFilename());
                Files.deleteIfExists(p);
            } catch (IOException e) {
                // log warn (don't fail deletion because of file delete problem)
                // logger.warn("Failed to delete gallery file: " + g.getFilename(), e);
            }
        }
        galleryRepository.deleteById(id);
    }

    /**
     * Save an uploaded file to disk and create DB record.
     * Returns saved Gallery entity.
     */
    public Gallery createWithFile(GalleryRequest req, byte[] fileBytes, String originalFilename) {
        try {
            // ensure upload dir exists
            Path uploads = Paths.get(uploadDir).toAbsolutePath();
            Files.createDirectories(uploads);

            // build unique filename
            String ext = "";
            int i = originalFilename.lastIndexOf('.');
            if (i > 0) ext = originalFilename.substring(i);
            String unique = UUID.randomUUID().toString() + ext;

            Path target = uploads.resolve(unique);
            Files.write(target, fileBytes, StandardOpenOption.CREATE_NEW);

            // build DB record with filename and generated imageUrl (relative)
            Gallery g = Gallery.builder()
                    .title(req.getTitle())
                    .subtitle(req.getSubtitle())
                    .description(req.getDescription())
                    .filename(unique)
                    .imageUrl("/uploads/" + unique) // frontend should fetch this path from server
                    .tag(req.getTag())
                    .layoutType(req.getLayoutType())
                    .build();

            return galleryRepository.save(g);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save uploaded file", e);
        }
    }
}
