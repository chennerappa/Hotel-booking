package com.web.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.Activity;
import com.web.model.Booking;
import com.web.model.Hotel;
import com.web.model.Room;
import com.web.model.RoomAvailability;
import com.web.model.User;
import com.web.repository.ActivityRepository;
import com.web.repository.BookingRepository;
import com.web.repository.HotelRepository;
import com.web.repository.RoomAvailabilityRepository;
import com.web.repository.RoomRepository;
import com.web.repository.UserRepository;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private HotelRepository hotelRepository;

	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private RoomAvailabilityRepository roomAvailabilityRepository;

	private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy HH:mm a");

	@Override
	public Booking createBooking(Booking booking, Long userId, Long roomId) throws Exception {
		User user = userService.findUserById(userId);
		Optional<Room> optionalRoom = roomRepository.findById(roomId);

		if (optionalRoom.isPresent()) {

			Room room = optionalRoom.get();

			if (booking.getNumberOfGuests() > room.getCapacity()) {
				throw new Exception("The number of guests exceeds the room capacity");
			}

			booking.setUser(user);
			booking.setRoom(room);
			booking.setCheckInDate(LocalDate.now());
			booking.setCheckOutDate(LocalDate.now().plusDays(5));

			long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
			Double price = days * room.getPrice();

			booking.setTotalPrice(price);
			booking.setCreatedAt(LocalDateTime.now().format(formatter));
			booking.setBookingStatus("PENDING");
			booking.setHotelId(room.getHotel().getId());
			booking.setHotelName(room.getHotel().getHotelName());
			booking.setAdminId(room.getAdminId());
			Booking savedBooking = bookingRepository.save(booking);

			user.getBookings().add(savedBooking);
			userRepository.save(user);

			Activity activity = new Activity();
			activity.setMessage("Booking created with user: " + user.getFullName());
			activity.setDate(LocalDateTime.now().format(formatter));
			activityRepository.save(activity);
			return savedBooking;
		} else {
			throw new Exception("Room not found.....!");
		}
	}

	@Override
	public List<Booking> getUserBookings(Long userId) throws Exception {
		User user = userService.findUserById(userId);
		List<Booking> bookings = bookingRepository.findByUserId(user.getId());
		bookings.sort(Comparator.comparing(Booking::getCreatedAt).reversed());
		return bookings;
	}

	@Override
	public Booking findBookingById(long bookingId) throws Exception {
		Optional<Booking> booking = bookingRepository.findById(bookingId);
		if (booking.isEmpty()) {
			throw new Exception("Booking not found with id: " + bookingId);
		}
		return booking.get();
	}

	@Override
	public List<Booking> findBookingsByRoomId(Long roomId) throws Exception {
		Optional<Room> room = roomRepository.findById(roomId);
		if (room.isEmpty()) {
			throw new Exception("Room not found.......!");
		}
		return bookingRepository.findByRoomId(room.get().getId());
	}

	@Override
	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}

	@Override
	public Booking updateBookingStatus(Long bookingId, String bookingStatus) throws Exception {
		Booking booking = findBookingById(bookingId);
		if (bookingStatus.equals("PENDING") || bookingStatus.equals("COMPLETED") || bookingStatus.equals("CANCELLED")) {
			booking.setBookingStatus(bookingStatus);
			return bookingRepository.save(booking);
		}
		throw new Exception("Please select a valid booking status");
	}

	@Override
	public List<Booking> findBookingsByHotelId(Long hotelId) throws Exception {
		Optional<Hotel> hotel = hotelRepository.findById(hotelId);
		if (hotel.isEmpty()) {
			throw new Exception("Hotel not found....!");
		}
		return bookingRepository.findByHotelId(hotel.get().getId());
	}

	@Override
	public List<Booking> findBookingsByRoomNumber(long roomNumber) throws Exception {
		Room room = roomRepository.findByRoomNumber(roomNumber);
		if (room == null) {
			throw new Exception("Room not found.....!");
		}

		List<Booking> bookings = bookingRepository.findByRoom(room);
		return bookings;
	}

	@Override
	public List<Booking> findBookingsByAdminId(Long adminId) throws Exception {
		User admin = userRepository.findById(adminId).get();
		if (admin == null) {
			throw new Exception("Admin not found.....!");
		}
		return bookingRepository.findByAdminId(admin.getId());
	}

	@Override
	public List<Booking> findBookingsByHotelName(String hotelName) throws Exception {
		Hotel hotel = hotelRepository.findByHotelName(hotelName);
		if (hotel == null) {
			throw new Exception("Hotel not found.....!");
		}

		List<Booking> bookings = bookingRepository.findByHotelId(hotel.getId());
		return bookings;
	}

	@Override
	public List<Activity> getActivities() {
		List<Activity> activities = activityRepository.findAll();
		activities.sort(Comparator.comparing(Activity::getDate).reversed());
		return activities;
	}

	@Override
	public Booking createBooking1(Booking booking, Long userId, Long roomId, LocalDate checkIn, LocalDate checkOut,
			int numberOfGuests) throws Exception {
		User user = userService.findUserById(userId);
		Optional<Room> optionalRoom = roomRepository.findById(roomId);

		if (optionalRoom.isPresent()) {
			Room room = optionalRoom.get();

			// Check if number of guests exceeds room capacity
			if (numberOfGuests > room.getCapacity()) {
				throw new Exception("The number of guests exceeds the room capacity");
			}

			// Check room availability
			boolean isAvailable = checkRoomAvailability(room, checkIn, checkOut);
			if (!isAvailable) {
				throw new Exception("The room is not available for the selected dates");
			}

			// Set booking details
			booking.setUser(user);
			booking.setRoom(room);
			booking.setCheckInDate(checkIn);
			booking.setCheckOutDate(checkOut);
			booking.setNumberOfGuests(numberOfGuests);

			long days = ChronoUnit.DAYS.between(checkIn, checkOut);
			Double price = days * room.getPrice();

			booking.setTotalPrice(price);
			booking.setCreatedAt(LocalDateTime.now().format(formatter));
			booking.setBookingStatus("PENDING");
			booking.setHotelId(room.getHotel().getId());
			booking.setHotelName(room.getHotel().getHotelName());
			booking.setAdminId(room.getAdminId());
			Booking savedBooking = bookingRepository.save(booking);

			// Mark room as unavailable for the booked dates
			markRoomUnavailable(room, checkIn, checkOut);

			user.getBookings().add(savedBooking);
			userRepository.save(user);

			Activity activity = new Activity();
			activity.setMessage("Booking created with user: " + user.getFullName());
			activity.setDate(LocalDateTime.now().format(formatter));
			activityRepository.save(activity);

			return savedBooking;
		} else {
			throw new Exception("Room not found.....!");
		}
	}

	// Check if the room is available for the given dates
	private boolean checkRoomAvailability(Room room, LocalDate checkInDate, LocalDate checkOutDate) {
		List<Booking> bookings = bookingRepository.findBookingsByRoomAndDates(room.getId(), checkInDate, checkOutDate);
		return bookings.isEmpty();
	}

	// Mark the room as unavailable for the given dates
	private void markRoomUnavailable(Room room, LocalDate checkInDate, LocalDate checkOutDate) {
		for (LocalDate date = checkInDate; date.isBefore(checkOutDate); date = date.plusDays(1)) {
			RoomAvailability roomAvailability = new RoomAvailability();
			roomAvailability.setRoom(room);
			roomAvailability.setDate(date);
			roomAvailabilityRepository.save(roomAvailability);
		}
	}
}
