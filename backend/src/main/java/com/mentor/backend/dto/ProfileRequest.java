package com.mentor.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRequest {
    private String fullName;
    private String phoneNumber;
    private String dateOfBirth;
    private String addressLine1;
    private String addressLine2;
    private String addressLine3;
}
