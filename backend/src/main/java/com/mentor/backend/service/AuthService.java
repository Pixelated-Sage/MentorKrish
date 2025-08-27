package com.mentor.backend.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    // =======================
    // REGISTER USER
    // =======================
    public User registerUser(RegisterRequest request) {
        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("User already exists with this email.");
        }

        User.UserBuilder builder = User.builder()
                .firebaseUid(request.getFirebaseUid())
                .email(request.getEmail())
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .emailVerified(request.isEmailVerified())
                .phoneVerified(false)
                .loginMethod(request.getLoginMethod())
                .role("USER");

        if ("EMAIL".equalsIgnoreCase(request.getLoginMethod())) {
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                throw new RuntimeException("Password is required for email registration.");
            }
            builder.password(passwordEncoder.encode(request.getPassword()));
        } else if ("GOOGLE".equalsIgnoreCase(request.getLoginMethod())) {
            // Allow null password for Google users
            builder.password(null);
        } else {
            // For other login methods, handle accordingly
            builder.password(null);
        }

        User user = builder.build();
        User saved = userRepository.save(user);

        try {
            otpService.sendOtp(saved.getEmail());
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP: " + e.getMessage(), e);
        }
        return saved;
    }

    // =======================
    // LOGIN USER
    // =======================
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
                otpService.resendOtp(userOpt.get().getEmail());
            } catch (Exception e) {
                throw new RuntimeException("Email not verified and OTP resend failed: " + e.getMessage(), e);
            }
            throw new RuntimeException("Email not verified. OTP resent.");
        }

        return userOpt;
    }

    // =======================
    // VERIFY EMAIL OTP
    // =======================
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

    // =======================
    // RESEND OTP
    // =======================
    public void resendOtp(String email) {
        try {
            otpService.resendOtp(email);
        } catch (Exception e) {
            throw new RuntimeException("Failed to resend OTP: " + e.getMessage(), e);
        }
    }

    // =======================
    // FORGOT PASSWORD FLOW
    // =======================

    /**
     * Step 1 - User requests password reset (send OTP to email)
     */
    public void initiatePasswordReset(String email) {
        userRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("No user found with email " + email));

        try {
            otpService.sendOtp(email);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP: " + e.getMessage(), e);
        }
    }

    /**
     * Step 2 - Verify OTP for password reset
     */
    public boolean verifyPasswordResetOtp(String email, String otp) {
        return otpService.verifyOtp(email, otp);
    }

    /**
     * Step 3 - Reset password after successful OTP verification
     */
    public boolean resetPassword(String email, String otp, String newPassword) {
        boolean verified = otpService.verifyOtp(email, otp);
        if (!verified) return false;

        userRepository.findByEmail(email).ifPresent(u -> {
            u.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(u);
        });
        return true;
    }
}
