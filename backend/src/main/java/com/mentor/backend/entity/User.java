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

    private String firebaseUid;

    @Column(nullable = false, unique = true)
    private String email;

    private String fullName;

    private String phoneNumber;

    private String loginMethod; // GOOGLE or OTP

    private boolean emailVerified;

    private boolean phoneVerified;

    private String role; // USER, ADMIN, etc.

    @Column(nullable = true)
    private String password;

    // === New Profile Fields ===
    @Column(name = "date_of_birth")
    private String dateOfBirth;

    @Column(name = "address_line1")
    private String addressLine1;

    @Column(name = "address_line2")
    private String addressLine2;

    @Column(name = "address_line3")
    private String addressLine3;
}
