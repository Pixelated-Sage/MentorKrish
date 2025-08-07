package com.mentor.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    private String firebaseUid; // optional for firebase users

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String fullName;

    private String phoneNumber;

    @NotBlank
    private String loginMethod; // "EMAIL" or "GOOGLE"

    private boolean emailVerified;

    @NotBlank
    private String password;
}
