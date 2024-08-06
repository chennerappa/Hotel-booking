package com.web.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Booking;
import com.web.model.User;
import com.web.response.PaymentResponse;
import com.web.service.BookingService;
import com.web.service.PaymentService;
import com.web.service.UserService;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping
	public ResponseEntity<Booking> createBooking(@RequestBody Booking booking,  
									@RequestHeader("Authorization") String jwt, 
									@RequestParam Long roomId) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		Booking createBooking = bookingService.createBooking(booking, user.getId(), roomId);
		return new ResponseEntity<Booking>(createBooking, HttpStatus.CREATED);
	}
	
	@GetMapping("/user_bookings")
	public ResponseEntity<List<Booking>> getUserBookings(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		return new ResponseEntity<List<Booking>>(bookingService.getUserBookings(user.getId()), HttpStatus.OK);
	}
	
	@PostMapping("/create")
    public ResponseEntity<PaymentResponse> createBooking1(
            @RequestBody Booking booking,
            @RequestHeader("Authorization") String jwt,
            @RequestParam Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut,
            @RequestParam int numberOfGuests) {
        try {
        	User user = userService.findUserByJwtToken(jwt);
            Booking createdBooking = bookingService.createBooking1(booking, user.getId(), roomId, checkIn, checkOut, numberOfGuests);
            
            PaymentResponse response = paymentService.createPaymentLink(createdBooking);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
	
	@PutMapping("/{bookingId}/update_status")
	public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long bookingId, @RequestParam String bookingStatus) throws Exception{
		return new ResponseEntity<Booking>(bookingService.updateBookingStatus(bookingId, bookingStatus), HttpStatus.CREATED);
	}
}
