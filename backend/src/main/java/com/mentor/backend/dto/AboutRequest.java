package com.mentor.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AboutRequest {
    private String content;
    private String founderName;
    private String founderQuote;
}

