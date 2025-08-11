package com.mentor.backend.controller;

import com.mentor.backend.dto.GalleryRequest;
import com.mentor.backend.entity.Gallery;
import com.mentor.backend.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    // GET all
    @GetMapping
    public ResponseEntity<List<Gallery>> listAll() {
        return ResponseEntity.ok(galleryService.getAll());
    }

    // GET by id
    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getById(@PathVariable Long id) {
        return ResponseEntity.ok(galleryService.getById(id));
    }

    // POST (JSON metadata only)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Gallery> create(@RequestBody GalleryRequest req) {
        return ResponseEntity.ok(galleryService.createFromDto(req));
    }

    // POST with multipart file (drag-and-drop UI should send form-data)
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Gallery> upload(
            @RequestPart("meta") GalleryRequest meta,
            @RequestPart("file") MultipartFile file) throws Exception {

        byte[] bytes = file.getBytes();
        Gallery saved = galleryService.createWithFile(meta, bytes, file.getOriginalFilename());
        return ResponseEntity.ok(saved);
    }

    // PUT update metadata
    @PutMapping("/{id}")
    public ResponseEntity<Gallery> update(@PathVariable Long id, @RequestBody GalleryRequest req) {
        return ResponseEntity.ok(galleryService.update(id, req));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        galleryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
