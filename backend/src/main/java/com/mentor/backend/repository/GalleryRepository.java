package com.mentor.backend.repository;

import com.mentor.backend.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    // Add custom queries if needed later (e.g. findByTag)
}
