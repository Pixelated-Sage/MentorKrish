package com.mentor.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AboutResponse {

    private Long id;
    private String content;
    private String founderName;
    private String founderQuote;
}
