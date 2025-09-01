package com.mentor.backend.service;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mentor.backend.dto.BlogRequest;
import com.mentor.backend.entity.Blog;
import com.mentor.backend.exception.ResourceNotFoundException;
import com.mentor.backend.repository.BlogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    private String generateSlug(String input) {
        if (input == null) return null;
        String noWhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(noWhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public Blog create(BlogRequest req) {
        String slug = (req.getSlug() == null || req.getSlug().isBlank())
                ? generateSlug(req.getTitle())
                : generateSlug(req.getSlug());

        String baseSlug = slug;
        int counter = 1;
        while (blogRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter++;
        }

        Blog blog = Blog.builder()
                .title(req.getTitle())
                .slug(slug)
                .content(req.getContent())
                .author(req.getAuthor())
                .published(req.isPublished())
                .publishedAt(req.isPublished() ? LocalDateTime.now() : null)
                .imageUrl(req.getImageUrl()) // Set image URL
                .build();

        return blogRepository.save(blog);
    }

    public List<Blog> getAll() {
        return blogRepository.findAll();
    }

    public Blog getById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog", "id", id));
    }

    public Blog getBySlug(String slug) {
        return blogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog", "slug", slug));
    }

    public Blog update(Long id, BlogRequest req) {
        Blog blog = getById(id);

        if (req.getTitle() != null && !req.getTitle().isBlank())
            blog.setTitle(req.getTitle());
        if (req.getContent() != null)
            blog.setContent(req.getContent());
        if (req.getAuthor() != null)
            blog.setAuthor(req.getAuthor());

        if (req.getSlug() != null && !req.getSlug().isBlank()) {
            String newSlug = generateSlug(req.getSlug());
            if (!newSlug.equals(blog.getSlug()) && blogRepository.existsBySlug(newSlug)) {
                throw new ResponseStatusException(org.springframework.http.HttpStatus.CONFLICT, "Slug already in use");
            }
            blog.setSlug(newSlug);
        }

        if (!blog.isPublished() && req.isPublished()) {
            blog.setPublished(true);
            blog.setPublishedAt(LocalDateTime.now());
        } else if (blog.isPublished() && !req.isPublished()) {
            blog.setPublished(false);
            blog.setPublishedAt(null);
        }

        if (req.getImageUrl() != null && !req.getImageUrl().isBlank()) {
            blog.setImageUrl(req.getImageUrl());
        }

        return blogRepository.save(blog);
    }

    public void delete(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blog", "id", id);
        }
        blogRepository.deleteById(id);
    }
}
