package com.web.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.web.model.ROOM_TYPE;
import com.web.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

	List<Room> findByHotelId(Long hotelId);

	Room findByRoomNumber(long roomNumber);

//	@Query("SELECT r FROM Room r WHERE " + "(r.hotel.hotelName LIKE %:hotelName%) AND " + "(r.hotel.city LIKE %:city%) AND "
//			+ "(r.roomType LIKE %:roomType%) AND " + "(r.isAvailable = :availabilityStatus)")
//	List<Room> searchRooms(@Param("hotelName") String hotelName, @Param("city") String city,
//			@Param("roomType") ROOM_TYPE roomType, @Param("availabilityStatus") Boolean availabilityStatus);

	@Query("SELECT r FROM Room r WHERE r.hotel.id = :hotelId AND (:roomType IS NULL OR r.roomType = :roomType) AND (:availability IS NULL OR r.isAvailable = :availability)")
	List<Room> findRoomsByHotelAndFilters(@Param("hotelId") Long hotelId, @Param("roomType") ROOM_TYPE roomType,
			@Param("availability") Boolean availability);
}
