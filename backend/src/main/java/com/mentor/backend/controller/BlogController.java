package com.mentor.backend.controller;

import com.mentor.backend.dto.BlogRequest;
import com.mentor.backend.dto.BlogResponse;
import com.mentor.backend.entity.Blog;
import com.mentor.backend.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BlogController {

    private final BlogService blogService;

    private BlogResponse toDto(Blog b) {
        return BlogResponse.builder()
                .id(b.getId())
                .title(b.getTitle())
                .slug(b.getSlug())
                .author(b.getAuthor())
                .content(b.getContent())
                .published(b.isPublished())
                .publishedAt(b.getPublishedAt())
                .createdAt(b.getCreatedAt())
                .updatedAt(b.getUpdatedAt())
                .build();
    }

    // Public: list
    @GetMapping
    public ResponseEntity<List<BlogResponse>> listAll() {
        List<BlogResponse> list = blogService.getAll().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    // Public: get by id
    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getById(@PathVariable Long id) {
        Blog b = blogService.getById(id);
        return ResponseEntity.ok(toDto(b));
    }

    // Public: get by slug
    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogResponse> getBySlug(@PathVariable String slug) {
        Blog b = blogService.getBySlug(slug);
        return ResponseEntity.ok(toDto(b));
    }

    // Admin only: create
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BlogResponse> create(@Validated @RequestBody BlogRequest req) {
        Blog saved = blogService.create(req);
        return new ResponseEntity<>(toDto(saved), HttpStatus.CREATED);
    }

    // Admin only: update
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BlogResponse> update(@PathVariable Long id, @RequestBody BlogRequest req) {
        Blog updated = blogService.update(id, req);
        return ResponseEntity.ok(toDto(updated));
    }

    // Admin only: delete
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
