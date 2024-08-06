package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.dto.HotelDto;
import com.web.model.Hotel;
import com.web.model.User;
import com.web.service.HotelService;
import com.web.service.UserService;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

	@Autowired
	private HotelService hotelService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{hotelId}")
	public ResponseEntity<Hotel> findHotelByID(@PathVariable Long hotelId) throws Exception{
		return new ResponseEntity<Hotel>(hotelService.findHotelById(hotelId), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<Hotel>> getAllHotels() {
		return new ResponseEntity<List<Hotel>>(hotelService.getAllHotels(), HttpStatus.OK);
	}
	
	@PutMapping("/{id}/add-favorites")
	public ResponseEntity<List<HotelDto>> addToFavourites(@RequestHeader("Authorization") String jwt,
			                                             @PathVariable Long id) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		List<HotelDto> hotel = hotelService.addToFavorites(id, user.getId());
		return new ResponseEntity<>(hotel, HttpStatus.OK);
	}
}
