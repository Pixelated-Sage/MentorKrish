package com.mentor.backend.repository;

import com.mentor.backend.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findByEmail(String email);
    long deleteByEmail(String email);
    boolean existsByEmail(String email);
}
