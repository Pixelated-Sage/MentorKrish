package com.mentor.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AboutRequest {

    @NotBlank(message = "Content is required")
    private String content;

    @NotBlank(message = "Founder name is required")
    private String founderName;

    @NotBlank(message = "Founder quote is required")
    private String founderQuote;
}
