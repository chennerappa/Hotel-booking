package com.web.service;

import java.time.LocalDate;
import java.util.List;

import com.web.model.Activity;
import com.web.model.Booking;

public interface BookingService {

	public Booking createBooking(Booking booking, Long userId, Long roomId) throws Exception;

	public List<Booking> getUserBookings(Long userId) throws Exception;

	public Booking findBookingById(long bookingId) throws Exception;

	public List<Booking> findBookingsByRoomId(Long roomId) throws Exception;

	public List<Booking> findBookingsByHotelId(Long hotelId) throws Exception;

	public List<Booking> getAllBookings();

	public Booking updateBookingStatus(Long bookingId, String bookingStatus) throws Exception;

	public List<Booking> findBookingsByRoomNumber(long roomNumber) throws Exception;

	public List<Booking> findBookingsByAdminId(Long adminId) throws Exception;

	public List<Booking> findBookingsByHotelName(String hotelName) throws Exception;

	public List<Activity> getActivities();

	public Booking createBooking1(Booking booking, Long userId, Long roomId, LocalDate checkIn, LocalDate checkOut,
			int numberOfGuests) throws Exception;
}
