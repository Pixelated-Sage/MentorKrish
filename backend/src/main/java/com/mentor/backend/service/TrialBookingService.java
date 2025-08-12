package com.mentor.backend.service;

import com.mentor.backend.dto.TrialBookingRequest;
import com.mentor.backend.dto.TrialBookingResponse;
import com.mentor.backend.entity.TrialBooking;
import com.mentor.backend.repository.TrialBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrialBookingService {

    private final TrialBookingRepository trialBookingRepository;

    public TrialBookingResponse createBooking(TrialBookingRequest request) {
        TrialBooking booking = TrialBooking.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .preferredDate(request.getPreferredDate())
                .preferredTime(request.getPreferredTime())
                .message(request.getMessage())
                .createdAt(LocalDateTime.now())
                .build();

        TrialBooking saved = trialBookingRepository.save(booking);

        return toResponse(saved);
    }

    public List<TrialBookingResponse> getAllBookings() {
        return trialBookingRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private TrialBookingResponse toResponse(TrialBooking booking) {
        return TrialBookingResponse.builder()
                .id(booking.getId())
                .fullName(booking.getFullName())
                .email(booking.getEmail())
                .phoneNumber(booking.getPhoneNumber())
                .preferredDate(booking.getPreferredDate())
                .preferredTime(booking.getPreferredTime())
                .message(booking.getMessage())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
