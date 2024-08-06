package com.web.service;

import java.util.List;

import com.web.dto.HotelDto;
import com.web.model.User;

public interface UserService {
	
	public User findUserById(Long userId) throws Exception;

	public User findUserByJwtToken(String jwt) throws Exception;
	
	public User findUserByEmail(String email) throws Exception;
	
	public List<HotelDto> getAllFavourites(Long userId) throws Exception;
	
}
