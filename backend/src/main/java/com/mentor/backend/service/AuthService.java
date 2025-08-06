package com.mentor.backend.service;

import com.mentor.backend.dto.LoginRequest;
import com.mentor.backend.dto.RegisterRequest;
import com.mentor.backend.entity.User;
import com.mentor.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public User registerUser(RegisterRequest request) {
        Optional<User> existing = userRepository.findByFirebaseUid(request.getFirebaseUid());
        if (existing.isPresent()) {
            return existing.get(); // already registered
        }

        User user = User.builder()
                .firebaseUid(request.getFirebaseUid())
                .email(request.getEmail())
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .emailVerified(false)
                .phoneVerified(false)
                .loginMethod(request.getLoginMethod())
                .role("USER")
                .build();

        return userRepository.save(user);
    }

    public Optional<User> loginUser(LoginRequest request) {
        return userRepository.findByFirebaseUid(request.getFirebaseUid());
    }
}
