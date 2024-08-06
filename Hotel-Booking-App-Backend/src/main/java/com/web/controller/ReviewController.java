package com.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Review;
import com.web.model.User;
import com.web.service.ReviewService;
import com.web.service.UserService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<Review> createReview(@RequestBody Review review, 
			                       @RequestHeader("Authorization") String jwt, 
			                       @RequestParam Long hotelId) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		Review createReview = reviewService.createReview(review, user.getId(), hotelId);
		return new ResponseEntity<Review>(createReview, HttpStatus.CREATED);
	}
}
