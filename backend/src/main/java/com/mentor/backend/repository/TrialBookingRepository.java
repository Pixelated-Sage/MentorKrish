package com.mentor.backend.repository;

import com.mentor.backend.entity.TrialBooking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrialBookingRepository extends JpaRepository<TrialBooking, Long> {
}
