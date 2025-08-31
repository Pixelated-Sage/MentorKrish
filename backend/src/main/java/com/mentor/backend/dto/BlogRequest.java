package com.mentor.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogRequest {

    @NotBlank
    @Size(min = 3, max = 255)
    private String title;

    private String slug;

    @NotBlank
    private String content;

    private String author;

    private boolean published;

    private String imageUrl; // URL string for frontend => backend

}
