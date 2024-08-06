package com.web.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.web.model.Booking;
import com.web.model.Room;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{

	List<Booking> findByUserId(Long userId);
	
	List<Booking> findByRoomId(Long roomId);
	
	List<Booking> findByHotelId(Long hotelId);
	
	List<Booking> findByRoom(Room room);
	
	List<Booking> findByAdminId(Long adminId);
	
	@Query("SELECT b FROM Booking b WHERE b.room.id = :roomId AND " +
	           "(b.checkInDate BETWEEN :checkInDate AND :checkOutDate OR " +
	           "b.checkOutDate BETWEEN :checkInDate AND :checkOutDate OR " +
	           ":checkInDate BETWEEN b.checkInDate AND b.checkOutDate OR " +
	           ":checkOutDate BETWEEN b.checkInDate AND b.checkOutDate)")
	    List<Booking> findBookingsByRoomAndDates(@Param("roomId") Long roomId,
	                                             @Param("checkInDate") LocalDate checkInDate,
	                                             @Param("checkOutDate") LocalDate checkOutDate);
}
