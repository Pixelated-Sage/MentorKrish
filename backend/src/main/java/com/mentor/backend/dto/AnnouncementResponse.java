package com.mentor.backend.dto;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnnouncementResponse {

    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String date;
    private String time;
    private LocalDateTime createdAt;  // Add these two
    private LocalDateTime updatedAt;
}
