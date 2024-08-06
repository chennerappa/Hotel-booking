package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Hotel;
import com.web.model.Review;
import com.web.model.Room;
import com.web.model.User;
import com.web.service.HotelService;
import com.web.service.ReviewService;
import com.web.service.RoomService;
import com.web.service.UserService;


@RestController
@RequestMapping("/api/admin/hotels")
public class AdminHotelController {

	@Autowired
	private HotelService hotelService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoomService roomService;
	
	@Autowired
	private ReviewService reviewService;
	
	@PostMapping
	public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel, 
			                                 @RequestHeader("Authorization") String jwt) throws Exception{		
		User user = userService.findUserByJwtToken(jwt);
		Hotel createHotel = hotelService.createHotel(hotel, user.getId());		
		return new ResponseEntity<Hotel>(createHotel, HttpStatus.CREATED);
	}
	
	@GetMapping("/{hotelId}")
	public ResponseEntity<Hotel> getHotelById(@PathVariable Long hotelId) throws Exception{
		return new ResponseEntity<Hotel>(hotelService.findHotelById(hotelId), HttpStatus.OK); 
	}
	
	@DeleteMapping("/{hotelId}")
	public ResponseEntity<String> deleteHotel(@PathVariable Long hotelId, 
			                                  @RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		return new ResponseEntity<String>(hotelService.deleteHotel(hotelId, user.getId()), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<Hotel>> getAllHotels() {
		return new ResponseEntity<List<Hotel>>(hotelService.getAllHotels(), HttpStatus.OK);
	}
	
	@GetMapping("/user_hotels")
	public ResponseEntity<List<Hotel>> findHotelsByUserId(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		return new ResponseEntity<List<Hotel>>(hotelService.findHotelsByUserId(user.getId()), HttpStatus.OK);
	}
	
	@PutMapping("/{hotelId}/update_status")
	public ResponseEntity<Hotel> updateHotelStatus(@PathVariable Long hotelId) throws Exception{
		return new ResponseEntity<Hotel>(hotelService.updateHotelStatus(hotelId), HttpStatus.ACCEPTED);
	}

	
	
	@GetMapping("/{hotelId}/rooms")
	public ResponseEntity<List<Room>> findRoomsByHotelId(@PathVariable Long hotelId) throws Exception{
		return new ResponseEntity<>(roomService.findRoomsByHotelId(hotelId), HttpStatus.OK);
				
	}
	
	@DeleteMapping("/delete_room/{roomId}")
	public ResponseEntity<String> deleteRoom(@PathVariable Long roomId) throws Exception{
		return new ResponseEntity<String>(roomService.deleteRoom(roomId), HttpStatus.OK);
	}
	
	
	//Get hotel reviews
	@GetMapping("hotel_reviews")
	public ResponseEntity<List<Review>> findReviewsByHotelId(@RequestParam Long hotelId) throws Exception{
		return new ResponseEntity<List<Review>>(reviewService.findReviewsByHotelId(hotelId), HttpStatus.OK);
	}
	
	//Delete hotel reviews
	@DeleteMapping("/delete_review/{reviewId}")
	public ResponseEntity<String> deleteReview(@PathVariable Long reviewId) throws Exception{
		return new ResponseEntity<String>(reviewService.deleteReview(reviewId), HttpStatus.OK);
	}
}
