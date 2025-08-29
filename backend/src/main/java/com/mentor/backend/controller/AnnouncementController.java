package com.mentor.backend.controller;

import com.mentor.backend.dto.AnnouncementRequest;
import com.mentor.backend.dto.AnnouncementResponse;
import com.mentor.backend.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.mentor.backend.service.CloudinaryService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;
    private final CloudinaryService cloudinaryService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnnouncementResponse> create(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam String date,
            @RequestParam String time) throws IOException {

        AnnouncementRequest request = new AnnouncementRequest();
        request.setTitle(title);
        request.setDescription(description);
        request.setDate(date);
        request.setTime(time);

        if (imageFile != null && !imageFile.isEmpty()) {
            // Upload image to Cloudinary and get URL
            String imageUrl = cloudinaryService.uploadFile(imageFile);
            request.setImageUrl(imageUrl);
        }

        return ResponseEntity.ok(announcementService.create(request));
    }

@GetMapping
public ResponseEntity<List<AnnouncementResponse>> getAll() {
    return ResponseEntity.ok(announcementService.getAll());
}

@GetMapping("/{id}")
public ResponseEntity<AnnouncementResponse> getById(@PathVariable Long id) {
    return ResponseEntity.ok(announcementService.getById(id));
}

@PutMapping("/{id}")
public ResponseEntity<AnnouncementResponse> update(@PathVariable Long id, @RequestBody AnnouncementRequest request) {
    return ResponseEntity.ok(announcementService.update(id, request));
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    announcementService.delete(id);
    return ResponseEntity.noContent().build();
}
}
