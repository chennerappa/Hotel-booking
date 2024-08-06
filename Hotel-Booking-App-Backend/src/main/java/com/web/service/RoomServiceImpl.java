package com.web.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.Booking;
import com.web.model.Hotel;
import com.web.model.ROOM_TYPE;
import com.web.model.Room;
import com.web.model.User;
import com.web.repository.BookingRepository;
import com.web.repository.RoomRepository;
import com.web.repository.UserRepository;
import com.web.request.RoomRequest;

@Service
public class RoomServiceImpl implements RoomService {

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private HotelService hotelService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BookingRepository bookingRepository;

	long number = 100;

	@Override
	public Room createRoom(Room room, Long hotelId, Long adminId) throws Exception {

		User admin = userRepository.findById(adminId).get();
		Hotel hotel = hotelService.findHotelById(hotelId);
		if (hotel.getOwner().getId() != admin.getId()) {
			throw new Exception("You can't create rooms for another admin hotels........!");
		}
		Room createRoom = new Room();
		createRoom.setRoomNumber(++number);
		createRoom.setDescription(hotel.getDescription());
		createRoom.setImages(room.getImages());
		createRoom.setPrice(room.getPrice());
		createRoom.setRoomType(room.getRoomType());
		createRoom.setCapacity(room.getCapacity());
		createRoom.setAvailable(true);
		createRoom.setCreatedAt(LocalDate.now());
		createRoom.setHotel(hotel);
		createRoom.setAdminId(hotel.getOwner().getId());
		return roomRepository.save(createRoom);
	}

	@Override
	public List<Room> getAllRooms() {
		return roomRepository.findAll();
	}

	@Override
	public Room findRoomById(Long roomId) throws Exception {
		Optional<Room> room = roomRepository.findById(roomId);
		if (room.isEmpty()) {
			throw new Exception("Room not found with id: " + roomId);
		}
		return room.get();
	}

	@Override
	public List<Room> findRoomsByHotelId(Long hotelId) throws Exception {
		Hotel hotel = hotelService.findHotelById(hotelId);
		return roomRepository.findByHotelId(hotel.getId());
	}

	@Override
	public Room updateAvailabilityStatus(Long roomId) throws Exception {
		Room room = findRoomById(roomId);
		if (room == null) {
			throw new Exception("Room not found");
		}
		room.setAvailable(!room.isAvailable());
		return roomRepository.save(room);
	}

//	@Override
//	public List<Room> searchRooms(String hotelName, String city, ROOM_TYPE roomType, boolean availabilityStatus) {		
//		return roomRepository.searchRooms(hotelName, city, roomType, availabilityStatus);
//	}

	@Override
	public String deleteRoom(Long roomId) throws Exception {
		Optional<Room> room = roomRepository.findById(roomId);
		if (room.isEmpty()) {
			throw new Exception("Room not found with id: " + roomId);
		}

		List<Booking> bookings = bookingRepository.findByRoomId(roomId);
		for (Booking booking : bookings) {
			bookingRepository.delete(booking);
		}

		roomRepository.delete(room.get());
		return "Room deleted successfully with id: " + roomId;
	}

	@Override
	public Room updateRoom(Long roomId, RoomRequest request) throws Exception {
		Optional<Room> optRoom = roomRepository.findById(roomId);
		if (optRoom.isEmpty()) {
			throw new Exception("Room not found with id: " + roomId);
		}
		Room room = optRoom.get();
		room.setRoomNumber(request.getRoomNumber());
		room.setRoomType(request.getRoomType());
		room.setCapacity(request.getCapacity());
		room.setImages(request.getImages());
		return roomRepository.save(room);
	}

	@Override
	public Room findByRoomNumber(long roomNumber) throws Exception {
		Room room = roomRepository.findByRoomNumber(roomNumber);
		if (room == null) {
			throw new Exception("Room not found with room number");
		}

		return room;
	}

	@Override
	public List<Room> getFilteredRooms(Long hotelId, ROOM_TYPE roomType, Boolean availability) {
		return roomRepository.findRoomsByHotelAndFilters(hotelId, roomType, availability);

	}

}
