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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Activity;
import com.web.model.Booking;
import com.web.model.User;
import com.web.service.BookingService;
import com.web.service.UserService;

@RestController
@RequestMapping("/api/admin/bookings")
public class AdminBookingController {

	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	public ResponseEntity<List<Booking>> getAllBookings(){
		return new ResponseEntity<List<Booking>>(bookingService.getAllBookings(), HttpStatus.OK);
	}
	
	@GetMapping("/room_bookings")
	public ResponseEntity<List<Booking>> findBookingByRoomId(@RequestParam Long roomId) throws Exception{
		return new ResponseEntity<List<Booking>>(bookingService.findBookingsByRoomId(roomId), HttpStatus.OK);
	}
	
	@PutMapping("/{bookingId}/update_status")
	public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long bookingId, @RequestParam String bookingStatus) throws Exception{
		return new ResponseEntity<Booking>(bookingService.updateBookingStatus(bookingId, bookingStatus), HttpStatus.CREATED);
	}
	
	@GetMapping("/{bookingId}")
	public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId) throws Exception{
		return new ResponseEntity<Booking>(bookingService.findBookingById(bookingId), HttpStatus.OK);
	}
	
	//Hotel Bookings using hotelId
	@GetMapping("/hotel_bookings/{hotelId}")
	public ResponseEntity<List<Booking>> findBookingByHotelId(@PathVariable Long hotelId) throws Exception{
		return new ResponseEntity<List<Booking>>(bookingService.findBookingsByHotelId(hotelId), HttpStatus.OK);
	}
	
	@GetMapping("/search_bookings")
	public ResponseEntity<List<Booking>> findBookingsByRoomNumber(@RequestParam long roomNumber) throws Exception{
		return new ResponseEntity<List<Booking>>(bookingService.findBookingsByRoomNumber(roomNumber), HttpStatus.OK);
	}
	
	//Find Bookings by Admin Id
	@GetMapping("/admin_bookings")
	public ResponseEntity<List<Booking>> findBookingsByAdminId(@RequestHeader("Authorization") String jwt) throws Exception{
		User admin = userService.findUserByJwtToken(jwt);
		List<Booking> bookings = bookingService.findBookingsByAdminId(admin.getId());
		return new ResponseEntity<List<Booking>>(bookings, HttpStatus.OK);
	}
	
	@GetMapping("/hotel_bookings")
	public ResponseEntity<List<Booking>> findBookingsByHotelName(@RequestParam String hotelName) throws Exception{
		return new ResponseEntity<List<Booking>>(bookingService.findBookingsByHotelName(hotelName), HttpStatus.OK);
	}
	
	@GetMapping("/activities")
	public ResponseEntity<List<Activity>> getActivities() throws Exception{
		return new ResponseEntity<List<Activity>>(bookingService.getActivities(), HttpStatus.OK);
	}
}
