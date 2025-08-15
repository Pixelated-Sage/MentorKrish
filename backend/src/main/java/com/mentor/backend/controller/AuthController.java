package com.mentor.backend.controller;

import com.mentor.backend.dto.LoginRequest;
import com.mentor.backend.dto.LoginResponse;
import com.mentor.backend.dto.RegisterRequest;
import com.mentor.backend.entity.User;
import com.mentor.backend.service.AuthService;
import com.mentor.backend.security.JwtUtil; // FIXED: change from .util to .security
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
    public ResponseEntity<LoginResponse> registerUser(@RequestBody RegisterRequest request) {
        User user = authService.registerUser(request);
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return ResponseEntity.ok(new LoginResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest request) {
        Optional<User> userOpt = authService.loginUser(request);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            return ResponseEntity.ok(new LoginResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole()));
        }
        return ResponseEntity.status(401).build();
    }
}
