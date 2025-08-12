package com.mentor.backend.controller;

import com.mentor.backend.dto.TrialBookingRequest;
import com.mentor.backend.dto.TrialBookingResponse;
import com.mentor.backend.service.TrialBookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trials")
@RequiredArgsConstructor
public class TrialBookingController {

    private final TrialBookingService trialBookingService;

    // Public: Anyone can create a booking
    @PostMapping
    public ResponseEntity<TrialBookingResponse> createBooking(
            @Valid @RequestBody TrialBookingRequest request) {
        return new ResponseEntity<>(trialBookingService.createBooking(request), HttpStatus.CREATED);
    }

    // Admin-only: View all bookings
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TrialBookingResponse>> getAllBookings() {
        return ResponseEntity.ok(trialBookingService.getAllBookings());
    }
}
