package com.mentor.backend.controller;

import com.mentor.backend.dto.ContactMessageRequest;
import com.mentor.backend.entity.ContactMessage;
import com.mentor.backend.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Adjust for your frontend domain if needed
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    @PostMapping
    public ResponseEntity<ContactMessage> sendMessage(@Valid @RequestBody ContactMessageRequest request) {
        ContactMessage savedMessage = contactMessageService.saveMessage(request);
        return ResponseEntity.ok(savedMessage);
    }
}
