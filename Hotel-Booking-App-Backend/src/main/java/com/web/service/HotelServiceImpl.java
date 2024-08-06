package com.web.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.dto.HotelDto;
import com.web.model.Hotel;
import com.web.model.Room;
import com.web.model.User;
import com.web.repository.HotelRepository;
import com.web.repository.RoomRepository;
import com.web.repository.UserRepository;

@Service
public class HotelServiceImpl implements HotelService {

	@Autowired
	private HotelRepository hotelRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoomRepository roomRepository;

	@Override
	public Hotel createHotel(Hotel hotel, Long userId) {
		User user = userRepository.findById(userId).get();

		Hotel createHotel = new Hotel();
		createHotel.setHotelName(hotel.getHotelName());
		createHotel.setDescription(hotel.getDescription());
		createHotel.setOwner(user);
		createHotel.setRegistrationDate(LocalDate.now());
		createHotel.setImages(hotel.getImages());
		createHotel.setAddress(hotel.getAddress());
		createHotel.setCity(hotel.getCity());
		createHotel.setState(hotel.getState());
		createHotel.setCountry(hotel.getCountry());
		createHotel.setZipCode(hotel.getZipCode());
		createHotel.setPhone(hotel.getPhone());
		createHotel.setEmail(hotel.getEmail());
		createHotel.setOpen(true);
//		createHotel.setUserId(user.getId());

		Hotel savedHotel = hotelRepository.save(createHotel);
		user.getHotels().add(savedHotel);
		return savedHotel;
	}

	@Override
	public String deleteHotel(Long hotelId, Long userId) throws Exception {
		User user = userRepository.findById(userId).get();
		Hotel hotel = hotelRepository.findById(hotelId).get();
		if (user.getId() != hotel.getOwner().getId()) {
			throw new Exception("You can't delete another user hotels");
		}
		for (Room room : hotel.getRooms()) {
	        roomRepository.delete(room);
	    }
		hotelRepository.delete(hotel);
		return "Hotel deleted successfully with id: " + hotelId;
	}
	

	@Override
	public List<Hotel> getAllHotels() {		
		return hotelRepository.findAll();
	}
	

	@Override
	public List<Hotel> findHotelsByUserId(Long userId) throws Exception{
		List<Hotel> hotel = hotelRepository.findByOwnerId(userId);
		if(hotel == null) {
			throw new Exception("Hotels not found with user id: "+ userId);
		}
		return hotel;
	}

	@Override
	public Hotel findHotelById(Long hotelId) throws Exception {
		Optional<Hotel> hotel = hotelRepository.findById(hotelId);
		if(hotel.isEmpty()) {
			throw new Exception("Hotel not found with id: " + hotelId);
		}
		return hotel.get();
	}

	@Override
	public Hotel updateHotel(Hotel hotel, Long hotelId, Long userId) throws Exception {
		User user = userRepository.findById(userId).get();
		Optional<Hotel> optHotel = hotelRepository.findById(hotelId);
		if(optHotel.isEmpty()) {
			throw new Exception("Hotel not found with id: " + hotelId);
		}
		Hotel updateHotel = optHotel.get();
		if (user.getId() != updateHotel.getOwner().getId()) {
			throw new Exception("You can't delete another user hotels");
		}
		updateHotel.setImages(hotel.getImages());
		updateHotel.setHotelName(hotel.getHotelName());
		return hotelRepository.save(updateHotel);
	}

	@Override
	public Hotel updateHotelStatus(Long hotelId) throws Exception {
		Hotel hotel = findHotelById(hotelId);
		if(hotel == null) {
			throw new Exception("Hotel not found........!");
		}
		hotel.setOpen(!hotel.isOpen());
		return hotelRepository.save(hotel);
	}

	@Override
	public List<HotelDto> addToFavorites(Long hotelId, Long userId) throws Exception {
	    Hotel hotel = findHotelById(hotelId);
	    User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
	    
	    HotelDto dto = new HotelDto();
	    dto.setDescription(hotel.getDescription());
	    dto.setImages(hotel.getImages());
	    dto.setHotelName(hotel.getHotelName());
	    dto.setId(hotelId);
	    dto.setOpen(hotel.isOpen());
	    
	    boolean isFavourited = false;
	    List<HotelDto> favourites = user.getFavourites();
	    for(HotelDto favourite : favourites) {
	        if (favourite.getId().equals(hotelId)) {
	            isFavourited = true;
	            break;
	        }
	    }
	    
	    if (isFavourited) {
	        favourites.removeIf(favourite -> favourite.getId().equals(hotelId));
	    } else {
	        favourites.add(dto);
	    }
	    
	    userRepository.save(user);
	    return favourites;
	}

}
