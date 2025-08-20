package com.mentor.backend.controller;

import com.mentor.backend.dto.ProfileRequest;
import com.mentor.backend.dto.ProfileResponse;
import com.mentor.backend.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // ✅ Get logged-in user's profile
    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile() {
        String email = getCurrentUserEmail();
        return ResponseEntity.ok(profileService.getProfile(email));
    }

    // ✅ Update logged-in user's profile
    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            @RequestBody ProfileRequest req
    ) {
        String email = getCurrentUserEmail();
        return ResponseEntity.ok(profileService.updateProfile(email, req));
    }

    // ✅ Helper method
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // because you stored email in JWT `sub`
    }
}
