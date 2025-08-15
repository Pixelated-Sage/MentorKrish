package com.mentor.backend.controller;

import com.mentor.backend.dto.GalleryRequest;
import com.mentor.backend.dto.GalleryResponse;
import com.mentor.backend.entity.Gallery;
import com.mentor.backend.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping
    public ResponseEntity<List<GalleryResponse>> listAll() {
        List<GalleryResponse> responses = galleryService.getAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<GalleryResponse> upload(
            @RequestPart("meta") GalleryRequest meta,
            @RequestPart("file") MultipartFile file) throws IOException {

        String filename = UUID.randomUUID() + getFileExtension(file.getOriginalFilename());
        Path uploadPath = Paths.get("uploads").resolve(filename);
        Files.createDirectories(uploadPath.getParent());
        Files.write(uploadPath, file.getBytes());

        Gallery gallery = Gallery.builder()
                .title(meta.getTitle())
                .subtitle(meta.getSubtitle())
                .description(meta.getDescription())
                .filename(filename)
                .tag(meta.getTag())
                .layoutType(meta.getLayoutType())
                .build();

        gallery = galleryService.create(gallery);
        return ResponseEntity.ok(mapToResponse(gallery));
    }

    private String getFileExtension(String name) {
        return name.lastIndexOf(".") != -1 ? name.substring(name.lastIndexOf(".")) : "";
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) throws IOException {
        Gallery gallery = galleryService.getById(id);
        Path imagePath = Paths.get("uploads").resolve(gallery.getFilename());
        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }
        byte[] imageBytes = Files.readAllBytes(imagePath);
        String contentType = Files.probeContentType(imagePath);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(imageBytes);
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
                .imageUrl("/uploads/" + gallery.getFilename())
                .build();
    }

}
