package com.mentor.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
 * For JSON-only requests, you can use this DTO (without file).
 * For multipart upload from frontend use the controller's Multipart endpoints.
 */
@Data
public class GalleryRequest {
    private String title;
    private String subtitle;
    private String description;
    private String tag;
    private String layoutType;

    // optional imageUrl if you already have hosted image
    private String imageUrl;
}
