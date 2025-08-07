package com.mentor.backend.controller;

import com.mentor.backend.dto.AnnouncementRequest;
import com.mentor.backend.dto.AnnouncementResponse;
import com.mentor.backend.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @PostMapping
    public ResponseEntity<AnnouncementResponse> create(@RequestBody AnnouncementRequest request) {
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
