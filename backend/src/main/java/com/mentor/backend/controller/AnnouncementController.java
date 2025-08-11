package com.mentor.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mentor.backend.dto.AnnouncementRequest;
import com.mentor.backend.dto.AnnouncementResponse;
import com.mentor.backend.service.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

//    @PreAuthorize("hasRole('ADMIN')")
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

    // @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementResponse> update(@PathVariable Long id, @RequestBody AnnouncementRequest request) {
        return ResponseEntity.ok(announcementService.update(id, request));
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        announcementService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
