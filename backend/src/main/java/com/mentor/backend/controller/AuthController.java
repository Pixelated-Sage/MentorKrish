package com.mentor.backend.controller;

import com.mentor.backend.dto.LoginRequest;
import com.mentor.backend.dto.RegisterRequest;
import com.mentor.backend.entity.User;
import com.mentor.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterRequest request) {
        User user = authService.registerUser(request);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginRequest request) {
        return authService.loginUser(request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }
}
