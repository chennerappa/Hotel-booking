package com.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.config.JwtProvider;
import com.web.dto.HotelDto;
import com.web.model.User;
import com.web.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtProvider jwtProvider;

	@Override
	public User findUserByJwtToken(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		User user = findUserByEmail(email);
		return user;
	}

	@Override
	public User findUserByEmail(String email) throws Exception {
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new Exception("User not found");
		}
		return user;
	}

	@Override
	public User findUserById(Long userId) throws Exception {
		Optional<User> user = userRepository.findById(userId);
		if(user.isEmpty()) {
			throw new Exception("User not found with id: " + userId);
		}
		return user.get();
	}

	@Override
	public List<HotelDto> getAllFavourites(Long userId) throws Exception {
		User user = findUserById(userId);
		return user.getFavourites();
	}

}
