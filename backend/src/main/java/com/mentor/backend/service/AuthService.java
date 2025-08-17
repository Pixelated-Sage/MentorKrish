package com.mentor.backend.service;

import com.mentor.backend.dto.LoginRequest;
import com.mentor.backend.dto.RegisterRequest;
import com.mentor.backend.entity.User;
import com.mentor.backend.repository.UserRepository;
import com.mentor.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil; // kept in case you need it elsewhere

    // In-memory OTP store (email -> OtpEntry). For production, use persistent store / cache like Redis.
    private final Map<String, OtpEntry> otpStore = new ConcurrentHashMap<>();

    // OTP / timing constants
    private static final Duration OTP_TTL = Duration.ofMinutes(5);
    private static final Duration RESEND_COOLDOWN = Duration.ofSeconds(30);

    // ==========================
    // Registration (returns User)
    // ==========================
    public User registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + request.getEmail());
        }

        User user = User.builder()
                .firebaseUid(null)
                .email(request.getEmail())
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .password(request.getPassword())  // stored plain text for now
                .loginMethod("EMAIL")
                .emailVerified(false)
                .phoneVerified(false)
                .role("USER")
                .profilePicture(null)
                .address(null)
                .build();

        userRepository.save(user);

        // Optionally send OTP automatically on register:
        // resendOtp(user.getEmail());

        return user;
    }

    // ==========================
    // Login (returns Optional<User>)
    // ==========================
    public Optional<User> loginUser(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) return Optional.empty();

        User user = userOpt.get();

        // Simple plain-text check (NOT SECURE). Use PasswordEncoder for production.
        if (user.getPassword() == null || !user.getPassword().equals(request.getPassword())) {
            return Optional.empty();
        }

        return Optional.of(user);
    }

    // ==========================
    // Resend (or send) OTP
    // ==========================
    public void resendOtp(String email) {
        // check user exists
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("No user found with email: " + email);
        }

        Instant now = Instant.now();

        // Check cooldown
        OtpEntry existing = otpStore.get(email);
        if (existing != null) {
            Instant lastSent = existing.getLastSent();
            if (lastSent != null && lastSent.plus(RESEND_COOLDOWN).isAfter(now)) {
                Duration wait = Duration.between(now, lastSent.plus(RESEND_COOLDOWN));
                throw new RuntimeException("Please wait " + wait.getSeconds() + " seconds before requesting another OTP.");
            }
        }

        String otp = generateOtp();
        OtpEntry entry = new OtpEntry(otp, now.plus(OTP_TTL), now);
        otpStore.put(email, entry);

        // TODO: Integrate with SMS / Email provider here.
        // For now we log it so you can see OTP in console during development:
        System.out.println("DEBUG OTP for " + email + " -> " + otp + " (valid " + OTP_TTL.toMinutes() + " minutes)");
    }

    // ==========================
    // Verify Email OTP
    // ==========================
    public boolean verifyEmailOtp(String email, String otp) {
        OtpEntry entry = otpStore.get(email);
        if (entry == null) {
            return false;
        }

        Instant now = Instant.now();

        if (entry.getExpiresAt().isBefore(now)) {
            otpStore.remove(email);
            return false; // expired
        }

        if (!entry.getOtp().equals(otp)) {
            return false; // mismatch
        }

        // mark user as emailVerified
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            // no user found; treat as failure
            otpStore.remove(email);
            return false;
        }

        User user = userOpt.get();
        user.setEmailVerified(true);
        userRepository.save(user);

        // remove used OTP
        otpStore.remove(email);
        return true;
    }

    // ==========================
    // Helper: generate 6-digit OTP
    // ==========================
    private String generateOtp() {
        Random rnd = new Random();
        int number = 100000 + rnd.nextInt(900000); // 100000..999999
        return String.valueOf(number);
    }

    // ==========================
    // Inner class: OTP entry
    // ==========================
    private static class OtpEntry {
        private final String otp;
        private final Instant expiresAt;
        private final Instant lastSent;

        public OtpEntry(String otp, Instant expiresAt, Instant lastSent) {
            this.otp = otp;
            this.expiresAt = expiresAt;
            this.lastSent = lastSent;
        }

        public String getOtp() {
            return otp;
        }

        public Instant getExpiresAt() {
            return expiresAt;
        }

        public Instant getLastSent() {
            return lastSent;
        }
    }
}
