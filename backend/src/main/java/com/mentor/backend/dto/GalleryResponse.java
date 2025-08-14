package com.mentor.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class GalleryResponse {
    private Long id;
    private String title;
    private String subtitle;
    private String description;
    private String tag;
    private String layoutType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String imageUrl; // URL to fetch the image
}
