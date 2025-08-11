package com.mentor.backend.service;

import org.springframework.stereotype.Service;

import com.mentor.backend.entity.User;
import com.mentor.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User saveUserIfNotExists(String firebaseUid,
                                String email,
                                String fullName,
                                String phoneNumber,
                                boolean emailVerified,
                                String loginMethod) {

    return userRepository.findByFirebaseUid(firebaseUid).orElseGet(() -> {
        User user = User.builder()
                .firebaseUid(firebaseUid)
                .email(email)
                .fullName(fullName)
                .phoneNumber(phoneNumber)
                .emailVerified(emailVerified)
                .phoneVerified(phoneNumber != null)
                .loginMethod(loginMethod)
                .role("USER") // default
                .build();

        return userRepository.save(user);
    });
    }
}
