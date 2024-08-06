package com.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.model.RoomAvailability;

public interface RoomAvailabilityRepository extends JpaRepository<RoomAvailability, Long> {
}

