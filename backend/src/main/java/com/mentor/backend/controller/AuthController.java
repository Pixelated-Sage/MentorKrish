package com.mentor.backend.controller;

import com.mentor.backend.dto.*;
import com.mentor.backend.entity.User;
import com.mentor.backend.security.JwtUtil;
import com.mentor.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest request) {
        User user = authService.registerUser(request);
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return ResponseEntity.ok(new LoginResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = authService.loginUser(request);
       if (userOpt.isEmpty()) return ResponseEntity.status(401).build();

       User user = userOpt.get();
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return ResponseEntity.ok(new LoginResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole()));
    }

    // === OTP endpoints ===

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@Valid @RequestBody OtpSendRequest req) {
        authService.resendOtp(req.getEmail()); // uses same logic/cooldown
        return ResponseEntity.ok("OTP sent.");
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@Valid @RequestBody OtpSendRequest req) {
        authService.resendOtp(req.getEmail());
        return ResponseEntity.ok("OTP resent.");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@Valid @RequestBody OtpVerifyRequest req) {
        boolean ok = authService.verifyEmailOtp(req.getEmail(), req.getOtp());
        return ok ? ResponseEntity.ok("Email verified.")
                : ResponseEntity.badRequest().body("Invalid or expired OTP.");
    }
}
