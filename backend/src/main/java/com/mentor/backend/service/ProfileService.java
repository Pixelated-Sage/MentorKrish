package com.mentor.backend.service;

import com.mentor.backend.dto.ProfileRequest;
import com.mentor.backend.dto.ProfileResponse;
import com.mentor.backend.entity.User;
import com.mentor.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ProfileResponse(
                user.getEmail(),
                user.getFullName(),
                user.getPhoneNumber(),
                user.getDateOfBirth(),
                user.getAddressLine1(),
                user.getAddressLine2(),
                user.getAddressLine3()
        );
    }

    public ProfileResponse updateProfile(String email, ProfileRequest req) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(req.getFullName());
        user.setPhoneNumber(req.getPhoneNumber());
        user.setDateOfBirth(req.getDateOfBirth());
        user.setAddressLine1(req.getAddressLine1());
        user.setAddressLine2(req.getAddressLine2());
        user.setAddressLine3(req.getAddressLine3());

        userRepository.save(user);

        return new ProfileResponse(
                user.getEmail(),
                user.getFullName(),
                user.getPhoneNumber(),
                user.getDateOfBirth(),
                user.getAddressLine1(),
                user.getAddressLine2(),
                user.getAddressLine3()
        );
    }
}
