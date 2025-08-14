package com.mentor.backend.controller;

import com.mentor.backend.dto.AboutRequest;
import com.mentor.backend.dto.AboutResponse;
import com.mentor.backend.service.AboutService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/about")
@RequiredArgsConstructor
public class AboutController {

    private final AboutService aboutService;

    @PostMapping
    public ResponseEntity<AboutResponse> createOrUpdate(@Valid @RequestBody AboutRequest request) {
        // Always updates record with ID=1 (or creates it if missing)
        return ResponseEntity.ok(aboutService.createAbout(request));
    }


    @GetMapping
    public ResponseEntity<List<AboutResponse>> getAll() {
        return ResponseEntity.ok(aboutService.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AboutResponse> update(@PathVariable Long id,
                                                @Valid @RequestBody AboutRequest request) {
        return ResponseEntity.ok(aboutService.updateAbout(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        aboutService.deleteAbout(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/latest")
    public ResponseEntity<AboutResponse> getLatest() {
        AboutResponse latest = aboutService.getLatest();
        if (latest == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(latest);
    }
}
