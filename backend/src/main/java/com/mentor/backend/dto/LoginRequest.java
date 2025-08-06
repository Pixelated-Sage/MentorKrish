package com.mentor.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {
    private String firebaseUid;
    private String idToken; // Firebase ID Token (optional, if validated backend-side)
}
