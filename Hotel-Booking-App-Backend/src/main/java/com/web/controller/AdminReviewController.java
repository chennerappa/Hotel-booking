package com.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Review;
import com.web.service.ReviewService;

@RestController
@RequestMapping("/api/admin/reviews")
public class AdminReviewController {

	@Autowired
	private ReviewService reviewService;
	
	@PutMapping("/{reviewId}/approve_request")
	public ResponseEntity<Review> approveReviewRequest(@PathVariable Long reviewId) throws Exception{
		return new ResponseEntity<Review>(reviewService.approveReviewRequest(reviewId), HttpStatus.ACCEPTED);
	}
}
