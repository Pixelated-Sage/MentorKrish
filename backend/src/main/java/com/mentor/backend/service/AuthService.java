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
    private final OtpService otpService;
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

        User saved = userRepository.save(user);

        try {
            otpService.generateAndSendOtp(saved.getEmail());
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP: " + e.getMessage(), e);
        }
        return saved;
    }

    public Optional<User> loginUser(LoginRequest request) {
        Optional<User> userOpt = Optional.empty();

        if (request.getFirebaseUid() != null && !request.getFirebaseUid().isBlank()) {
            userOpt = userRepository.findByFirebaseUid(request.getFirebaseUid());
        } else if (request.getEmail() != null && request.getPassword() != null) {
            userOpt = userRepository.findByEmail(request.getEmail())
                    .filter(user -> passwordEncoder.matches(request.getPassword(), user.getPassword()));
        }

        if (userOpt.isPresent() && !userOpt.get().isEmailVerified()) {
            try {
                otpService.generateAndSendOtp(userOpt.get().getEmail());
            } catch (Exception e) {
                throw new RuntimeException("Email not verified and OTP resend failed: " + e.getMessage(), e);
            }
            throw new RuntimeException("Email not verified. OTP resent.");
        }

        return userOpt;
    }

    public boolean verifyEmailOtp(String email, String otp) {
        boolean verified = otpService.verifyOtp(email, otp);
        if (verified) {
            userRepository.findByEmail(email).ifPresent(u -> {
                u.setEmailVerified(true);
                userRepository.save(u);
            });
        }
        return verified;
    }

    public void resendOtp(String email) {
        try {
            otpService.resendOtp(email);
        } catch (Exception e) {
            throw new RuntimeException("Failed to resend OTP: " + e.getMessage(), e);
        }
    }
}
