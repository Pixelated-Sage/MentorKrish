package com.mentor.backend.controller;

import com.mentor.backend.dto.ProfileUpdateRequest;
import com.mentor.backend.entity.User;
import com.mentor.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // Get Profile
    @GetMapping
    public User getProfile(Authentication auth) {
        return profileService.getProfile(auth.getName());
    }

    // Update Profile
    @PutMapping
    public User updateProfile(Authentication auth, @RequestBody ProfileUpdateRequest request) {
        return profileService.updateProfile(auth.getName(), request);
    }
}
