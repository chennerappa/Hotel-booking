package com.web.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.Hotel;
import com.web.model.Review;
import com.web.model.User;
import com.web.repository.HotelRepository;
import com.web.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService{

	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private HotelRepository hotelRepository;
	
	@Override
	public Review createReview(Review review, Long userId, Long hotelId) throws Exception{
		User user = userService.findUserById(userId);
		Optional<Hotel> optHotel = hotelRepository.findById(hotelId);
		
		if(optHotel.isPresent()) {
			Hotel hotel = optHotel.get();
			review.setUser(user);
			review.setHotel(hotel);
			review.setCreatedAt(LocalDateTime.now());
			review.setIsApproved(false);
			review.setReviewerName(user.getFullName());
			Review savedReview = reviewRepository.save(review);
			hotel.getReviews().add(savedReview);
			return savedReview;
		}else {
			throw new Exception("Hotel not found......!");
		}
		
	}

	@Override
	public Review findReviewById(Long reviewId) throws Exception {
		Optional<Review> review = reviewRepository.findById(reviewId);
		if(review.isEmpty()) {
			throw new Exception("Review not found with id: " + reviewId);
		}
		return review.get();
	}

	@Override
	public List<Review> getAllReviews() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Review> findReviewsByHotelId(Long hotelId) throws Exception {
		Hotel hotel = hotelRepository.findById(hotelId).get();
		if(hotel == null) {
			throw new Exception("Hotel not found......!");
		}
		return reviewRepository.findByHotelId(hotel.getId());
	}

	@Override
	public String deleteReview(Long reviewId) throws Exception {
		Optional<Review> review = reviewRepository.findById(reviewId);
		if(review.isEmpty()) {
			throw new Exception("Review not found with id: " + reviewId);
		}
		reviewRepository.delete(review.get());
		return "Review deleted successfully with id: " + reviewId;
	}

	@Override
	public Review approveReviewRequest(Long reviewId) throws Exception {
		Optional<Review> optReview = reviewRepository.findById(reviewId);
		if(optReview.isEmpty()) {
			throw new Exception("Review not found with id: " + reviewId);
		}
		Review review = optReview.get();
		review.setIsApproved(true);
		return reviewRepository.save(review);
	}

}
