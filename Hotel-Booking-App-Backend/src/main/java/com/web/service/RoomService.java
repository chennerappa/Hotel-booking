package com.web.service;

import java.util.List;

import com.web.model.ROOM_TYPE;
import com.web.model.Room;
import com.web.request.RoomRequest;

public interface RoomService {

	public Room createRoom(Room room, Long hotelId, Long adminId) throws Exception;
	
	public List<Room> getAllRooms();
	
	public Room findRoomById(Long roomId) throws Exception;
	
	public List<Room> findRoomsByHotelId(Long hotelId) throws Exception;
	
	public Room updateAvailabilityStatus(Long roomId) throws Exception;
	
//	public List<Room> searchRooms(String hotelName, String city, ROOM_TYPE roomType, boolean availabilityStatus);
	
	public String deleteRoom(Long roomId) throws Exception;
	
	public Room updateRoom(Long roomId, RoomRequest request) throws Exception;
	
	public Room findByRoomNumber(long roomNumber) throws Exception;
	
	public List<Room> getFilteredRooms(Long hotelId, ROOM_TYPE roomType, Boolean availability);
}
