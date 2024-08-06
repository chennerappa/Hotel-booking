package com.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{

	List<Review> findByHotelId(Long hotelId);
}
