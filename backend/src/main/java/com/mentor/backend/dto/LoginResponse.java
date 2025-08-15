package com.mentor.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Long id;
    private String email;
    private String fullName;
    private String role;
}