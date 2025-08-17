package com.mentor.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Firebase UID for Google/OTP logins (null for email-password users)
    @Column(unique = true)
    private String firebaseUid;

    @Column(nullable = false, unique = true)
    private String email;

    private String fullName;

    private String phoneNumber;

    private String loginMethod; // EMAIL, GOOGLE, OTP

    private boolean emailVerified;

    private boolean phoneVerified;

    private String role; // USER, ADMIN, etc.

    @Column(nullable = true)
    private String password; // stored plain for now, use BCrypt later

    // ✅ Profile Management fields
    private String profilePicture; // URL to profile picture

    private String address; // User's address
}
