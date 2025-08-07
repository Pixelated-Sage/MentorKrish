package com.mentor.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AnnouncementRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    private String imageUrl;

    @NotBlank(message = "Date is required")
    private String date;

    @NotBlank(message = "Time is required")
    private String time;
}
