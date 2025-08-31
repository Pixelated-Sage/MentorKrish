package com.mentor.backend.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BlogResponse {
    private Long id;
    private String title;
    private String slug;
    private String content;
    private String author;
    private boolean published;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageUrl;
}
