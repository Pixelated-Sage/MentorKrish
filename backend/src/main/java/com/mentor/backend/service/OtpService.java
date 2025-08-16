package com.mentor.backend.service;

import com.mentor.backend.entity.OtpVerification;
import com.mentor.backend.repository.OtpVerificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpVerificationRepository otpRepository;
    private final EmailService emailService;

    @Value("${app.otp.expMinutes:5}")
    private int otpExpMinutes;

    @Value("${app.otp.cooldownSeconds:60}")
    private int cooldownSeconds;

    private static final Random RANDOM = new Random();

    private String generateOtp() {
        return String.format("%06d", RANDOM.nextInt(1_000_000));
    }

    // Backwards-compatible alias
    public void generateAndSendOtp(String email) throws Exception {
        sendOtp(email);
    }

    public void sendOtp(String email) throws Exception {
        LocalDateTime now = LocalDateTime.now();
        Optional<OtpVerification> existingOpt = otpRepository.findByEmail(email);

        if (existingOpt.isPresent()) {
            OtpVerification existing = existingOpt.get();
            if (existing.getLastSentAt() != null &&
                    existing.getLastSentAt().plusSeconds(cooldownSeconds).isAfter(now)) {
                long wait = java.time.Duration
                        .between(now, existing.getLastSentAt().plusSeconds(cooldownSeconds))
                        .toSeconds();
                throw new IllegalStateException("Please wait " + wait + " seconds before requesting a new OTP.");
            }
        }

        String otp = generateOtp();
        LocalDateTime expiresAt = now.plusMinutes(otpExpMinutes);

        OtpVerification entity = existingOpt.orElseGet(() ->
                OtpVerification.builder().email(email).build()
        );
        entity.setOtp(otp);
        entity.setExpiryTime(expiresAt);
        entity.setLastSentAt(now);
        otpRepository.save(entity);

        String subject = "Your OTP Code";
        String html = """
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222">
              <p>Hi,</p>
              <p>Your OTP is:</p>
              <p style="font-size:22px;font-weight:bold;letter-spacing:3px">%s</p>
              <p>This code will expire in %d minutes.</p>
              <p>If you didn’t request this, you can ignore this email.</p>
              <br>
              <p>— MentorKrish</p>
            </div>
        """.formatted(otp, otpExpMinutes);

        emailService.sendEmail(email, subject, html);
    }

    public void resendOtp(String email) throws Exception {
        // Cooldown enforced in sendOtp()
        sendOtp(email);
    }

    @Transactional  // ✅ FIX: ensures delete runs inside a transaction
    public boolean verifyOtp(String email, String otp) {
        Optional<OtpVerification> recOpt = otpRepository.findByEmail(email);
        if (recOpt.isEmpty()) return false;

        OtpVerification rec = recOpt.get();
        LocalDateTime now = LocalDateTime.now();

        boolean valid = rec.getOtp().equals(otp) && rec.getExpiryTime().isAfter(now);

        if (valid) {
            otpRepository.deleteByEmail(email); // one-time use
            return true;
        }
        return false;
    }
}
