package com.mentor.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mentor.backend.dto.LoginRequest;
import com.mentor.backend.dto.RegisterRequest;
import com.mentor.backend.entity.User;
import com.mentor.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(RegisterRequest request) {
        Optional<User> existing = userRepository.findByEmail(request.getEmail());
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
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        return userRepository.save(user);
    }

  public Optional<User> loginUser(LoginRequest request) {
        if (request.getFirebaseUid() != null && !request.getFirebaseUid().isBlank()) {
            return userRepository.findByFirebaseUid(request.getFirebaseUid());
        }
        if (request.getEmail() != null && request.getPassword() != null) {
            return userRepository.findByEmail(request.getEmail())
                // FIX: use password encoder to check hash!
                .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()));
        }
        return Optional.empty();
    }
}
