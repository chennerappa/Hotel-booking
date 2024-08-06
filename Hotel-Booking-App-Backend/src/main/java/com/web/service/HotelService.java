package com.web.service;

import java.util.List;

import com.web.dto.HotelDto;
import com.web.model.Hotel;

public interface HotelService {

	public Hotel createHotel(Hotel hotel, Long userId);
	
	public List<Hotel> getAllHotels();
	
	public List<Hotel> findHotelsByUserId(Long userId) throws Exception;
	
	public Hotel findHotelById(Long hotelId) throws Exception;
	
	public String deleteHotel(Long hotelId, Long userId) throws Exception;
	
	public Hotel updateHotel(Hotel hotel,Long hotelId, Long userId) throws Exception;
	
	public Hotel updateHotelStatus(Long hotelId) throws Exception;
	
	public List<HotelDto> addToFavorites(Long hotelId, Long userId) throws Exception;
	
//	public Optional<Hotel> findHotelByUserId(Long userId) throws Exception;
}
