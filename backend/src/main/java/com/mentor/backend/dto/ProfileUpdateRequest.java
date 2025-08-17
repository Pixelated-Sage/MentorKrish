package com.mentor.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequest {

    private String fullName;
    private String phoneNumber;
    private String address;
    private String profilePicture; // optional new pic URL (base64 -> stored in S3 or local)
}
