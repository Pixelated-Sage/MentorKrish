package com.mentor.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GalleryResponse {
    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private String filename;
    private String imageUrl;
    private String tag;
    private String layoutType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
