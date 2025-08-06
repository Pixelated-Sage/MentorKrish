package com.mentor.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String firebaseUid;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String loginMethod; // GOOGLE or OTP
}
