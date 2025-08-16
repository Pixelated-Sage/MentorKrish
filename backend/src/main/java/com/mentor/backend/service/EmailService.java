package com.mentor.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    private static final String BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

    @Value("${brevo.api.key}")
    private String brevoApiKey;

    @Value("${app.otp.senderEmail}")
    private String senderEmail;

    @Value("${app.otp.senderName}")
    private String senderName;

    // Sends HTML email using Brevo HTTP API
    public void sendEmail(String toEmail, String subject, String htmlContent) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> payload = Map.of(
                "sender", Map.of(
                        "email", senderEmail,
                        "name", senderName
                ),
                "to", List.of(
                        Map.of("email", toEmail)
                ),
                "subject", subject,
                "htmlContent", htmlContent
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", brevoApiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        ResponseEntity<String> resp = restTemplate.exchange(
                BREVO_API_URL, HttpMethod.POST, entity, String.class
        );

        if (!resp.getStatusCode().is2xxSuccessful()) {
            throw new Exception("Brevo API failed: HTTP " + resp.getStatusCodeValue() + " - " + resp.getBody());
        }
    }
}
