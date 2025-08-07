package com.mentor.backend.repository;

import com.mentor.backend.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
