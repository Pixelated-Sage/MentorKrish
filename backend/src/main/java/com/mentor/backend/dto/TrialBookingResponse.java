package com.mentor.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class TrialBookingResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String preferredDate;
    private String preferredTime;
    private String message;
    private LocalDateTime createdAt;
}
