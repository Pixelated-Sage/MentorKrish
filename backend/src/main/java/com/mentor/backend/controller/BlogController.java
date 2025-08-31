package com.mentor.backend.controller;

import com.mentor.backend.dto.BlogRequest;
import com.mentor.backend.dto.BlogResponse;
import com.mentor.backend.service.CloudinaryService;
import com.mentor.backend.entity.Blog;
import com.mentor.backend.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final CloudinaryService cloudinaryService;

    private BlogResponse mapToDto(Blog blog) {
        return BlogResponse.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .slug(blog.getSlug())
                .content(blog.getContent())
                .author(blog.getAuthor())
                .published(blog.isPublished())
                .publishedAt(blog.getPublishedAt())
                .createdAt(blog.getCreatedAt())
                .updatedAt(blog.getUpdatedAt())
                .imageUrl(blog.getImageUrl())
                .build();
    }

    // Public: List blogs
    @GetMapping
    public ResponseEntity<List<BlogResponse>> listAll() {
        List<Blog> blogs = blogService.getAll();
        return ResponseEntity.ok(blogs.stream().map(this::mapToDto).toList());
    }

    // Public: Get blog by id
    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getById(@PathVariable Long id) {
        Blog blog = blogService.getById(id);
        return ResponseEntity.ok(mapToDto(blog));
    }

    // Public: Get blog by slug
    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogResponse> getBySlug(@PathVariable String slug) {
        Blog blog = blogService.getBySlug(slug);
        return ResponseEntity.ok(mapToDto(blog));
    }

    // Admin only: Create blog with image upload
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BlogResponse> createBlog(
            @RequestParam String title,
            @RequestParam(required = false) String slug,
            @RequestParam String content,
            @RequestParam(required = false) String author,
            @RequestParam boolean published,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = cloudinaryService.uploadFile(image);
        }

        BlogRequest req = new BlogRequest();
        req.setTitle(title);
        req.setSlug(slug);
        req.setContent(content);
        req.setAuthor(author);
        req.setPublished(published);
        req.setImageUrl(imageUrl);

        Blog blog = blogService.create(req);
        return new ResponseEntity<>(mapToDto(blog), HttpStatus.CREATED);
    }

    // Admin only: Update blog (with optional image upload)
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BlogResponse> updateBlog(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam(required = false) String slug,
            @RequestParam String content,
            @RequestParam(required = false) String author,
            @RequestParam boolean published,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = cloudinaryService.uploadFile(image);
        }

        BlogRequest req = new BlogRequest();
        req.setTitle(title);
        req.setSlug(slug);
        req.setContent(content);
        req.setAuthor(author);
        req.setPublished(published);
        req.setImageUrl(imageUrl);

        Blog blog = blogService.update(id, req);
        return ResponseEntity.ok(mapToDto(blog));
    }

    // Admin only: Delete blog
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
