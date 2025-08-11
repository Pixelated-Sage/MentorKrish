package com.mentor.backend.service;

import com.mentor.backend.dto.BlogRequest;
import com.mentor.backend.entity.Blog;
import com.mentor.backend.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;

    public Blog create(BlogRequest req) {
        String slug = (req.getSlug() == null || req.getSlug().isBlank())
                ? generateSlug(req.getTitle())
                : generateSlug(req.getSlug());

        // ensure unique slug
        String base = slug;
        int suffix = 1;
        while (blogRepository.existsBySlug(slug)) {
            slug = base + "-" + suffix++;
        }

        Blog blog = Blog.builder()
                .title(req.getTitle())
                .slug(slug)
                .content(req.getContent())
                .author(req.getAuthor())
                .published(req.isPublished())
                .publishedAt(req.isPublished() ? LocalDateTime.now() : null)
                .build();

        return blogRepository.save(blog);
    }

    public List<Blog> getAll() {
        return blogRepository.findAll();
    }

    public Blog getById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found with id: " + id));
    }

    public Blog getBySlug(String slug) {
        return blogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found with slug: " + slug));
    }

    public Blog update(Long id, BlogRequest req) {
        Blog existing = getById(id);

        if (req.getTitle() != null && !req.getTitle().isBlank()) existing.setTitle(req.getTitle());
        if (req.getContent() != null) existing.setContent(req.getContent());
        if (req.getAuthor() != null) existing.setAuthor(req.getAuthor());

        // handle slug update if provided
        if (req.getSlug() != null && !req.getSlug().isBlank()) {
            String newSlug = generateSlug(req.getSlug());
            if (!newSlug.equals(existing.getSlug()) && blogRepository.existsBySlug(newSlug)) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Slug already in use");
            }
            existing.setSlug(newSlug);
        }

        // published flag handling
        if (req.isPublished() && !existing.isPublished()) {
            existing.setPublished(true);
            existing.setPublishedAt(LocalDateTime.now());
        } else if (!req.isPublished() && existing.isPublished()) {
            existing.setPublished(false);
            existing.setPublishedAt(null);
        }

        return blogRepository.save(existing);
    }

    public void delete(Long id) {
        if (!blogRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog not found with id: " + id);
        }
        blogRepository.deleteById(id);
    }

    // --- helper: simple slug generator ---
    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    private String generateSlug(String input) {
        if (input == null) return null;
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }
}
