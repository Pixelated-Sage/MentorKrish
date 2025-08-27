package com.mentor.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mentor.backend.dto.GalleryRequest;
import com.mentor.backend.dto.GalleryResponse;
import com.mentor.backend.entity.Gallery;
import com.mentor.backend.service.CloudinaryService;
import com.mentor.backend.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GalleryController {

    private final GalleryService galleryService;
    private final CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<List<GalleryResponse>> listAll() {
        List<GalleryResponse> responses = galleryService.getAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<GalleryResponse> upload(
            @RequestPart("meta") String metaJson,
            @RequestPart("file") MultipartFile file) throws IOException {

        // Parse JSON metadata
        ObjectMapper mapper = new ObjectMapper();
        GalleryRequest meta = mapper.readValue(metaJson, GalleryRequest.class);

        // Upload to Cloudinary
        String imageUrl = cloudinaryService.uploadFile(file);

        // Save in DB
        Gallery gallery = galleryService.create(meta, imageUrl);

        return ResponseEntity.ok(mapToResponse(gallery));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        galleryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private GalleryResponse mapToResponse(Gallery gallery) {
        return GalleryResponse.builder()
                .id(gallery.getId())
                .title(gallery.getTitle())
                .subtitle(gallery.getSubtitle())
                .description(gallery.getDescription())
                .tag(gallery.getTag())
                .layoutType(gallery.getLayoutType())
                .createdAt(gallery.getCreatedAt())
                .updatedAt(gallery.getUpdatedAt())
                .imageUrl(gallery.getFilename()) // now stores Cloudinary URL
                .build();
    }
}
