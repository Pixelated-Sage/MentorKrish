package com.mentor.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    private String firebaseUid; // for firebase login

    @Email
    private String email;

    private String password;
}
