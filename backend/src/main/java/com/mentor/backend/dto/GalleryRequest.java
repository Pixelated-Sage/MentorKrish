package com.mentor.backend.dto;

import lombok.Data;

@Data
public class GalleryRequest {
    private String title;
    private String subtitle;
    private String description;
    private String tag;
    private String layoutType;
}
