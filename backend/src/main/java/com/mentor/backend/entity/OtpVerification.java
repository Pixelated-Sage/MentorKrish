package com.mentor.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verifications", indexes = {
        @Index(name = "idx_otp_email", columnList = "email", unique = true)
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OtpVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique = true)
    private String email;

    @Column(nullable=false)
    private String otp;

    @Column(nullable=false)
    private LocalDateTime expiryTime;

    @Column
    private LocalDateTime lastSentAt;
}
