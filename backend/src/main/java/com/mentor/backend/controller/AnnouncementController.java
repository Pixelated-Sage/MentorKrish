package com.mentor.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mentor.backend.dto.AnnouncementRequest;
import com.mentor.backend.dto.AnnouncementResponse;
import com.mentor.backend.service.AnnouncementService;
import com.mentor.backend.service.CloudinaryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;
    private final CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<List<AnnouncementResponse>> getAll() {
        return ResponseEntity.ok(announcementService.getAll());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnnouncementResponse> create(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(required = false) String content, // <-- add this line
            @RequestParam("image") MultipartFile imageFile,
            @RequestParam String date,
            @RequestParam String time) throws IOException {
        String imageUrl = cloudinaryService.uploadFile(imageFile);
        AnnouncementRequest request = new AnnouncementRequest();
        request.setTitle(title);
        request.setDescription(description);
        request.setContent(content); // <-- add this
        request.setImageUrl(imageUrl);
        request.setDate(date);
        request.setTime(time);
        return ResponseEntity.ok(announcementService.create(request));
    }
    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementResponse> update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(required = false) String content,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam String date,
            @RequestParam String time) throws IOException {
        String imageUrl = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            imageUrl = cloudinaryService.uploadFile(imageFile);
        }
        AnnouncementRequest request = new AnnouncementRequest();
        request.setTitle(title);
        request.setDescription(description);
        request.setContent(content);
        request.setImageUrl(imageUrl);
        request.setDate(date);
        request.setTime(time);
        return ResponseEntity.ok(announcementService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        announcementService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
