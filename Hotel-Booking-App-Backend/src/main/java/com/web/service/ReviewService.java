package com.web.service;

import java.util.List;

import com.web.model.Review;

public interface ReviewService {

	public Review createReview(Review review, Long userId, Long hotelId) throws Exception;
	
	public Review findReviewById(Long reviewId) throws Exception;
	
	public List<Review> getAllReviews();
	
	public List<Review> findReviewsByHotelId(Long hotelId) throws Exception;
	
	public String deleteReview(Long reviewId) throws Exception;
	
	public Review approveReviewRequest(Long reviewId) throws Exception;
}
