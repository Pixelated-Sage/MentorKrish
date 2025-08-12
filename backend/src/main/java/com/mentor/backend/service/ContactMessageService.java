package com.mentor.backend.service;

import com.mentor.backend.dto.ContactMessageRequest;
import com.mentor.backend.entity.ContactMessage;
import com.mentor.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessage saveMessage(ContactMessageRequest request) {
        ContactMessage message = ContactMessage.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .createdAt(LocalDateTime.now())
                .build();
        return contactMessageRepository.save(message);
    }
}
