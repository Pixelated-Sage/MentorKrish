package com.mentor.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 255)
    private String title;

    // Optional: service will generate slug if missing
    private String slug;

    @NotBlank(message = "Content is required")
    private String content;

    @Size(max = 255)
    private String author;

    // publish now or keep draft
    private boolean published;
}
