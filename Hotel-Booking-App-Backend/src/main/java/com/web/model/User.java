package com.web.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.web.dto.HotelDto;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
//@AllArgsConstructorr
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String fullName;
	
	private String email;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	
	private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;
	
	@OneToMany
	private List<Hotel> hotels = new ArrayList<>();
	
	@JsonIgnore
	@OneToMany
	private List<Booking> bookings = new ArrayList<>();
	
	@OneToMany
	private List<Review> reviews = new ArrayList<>();
	
	@ElementCollection
	private List<HotelDto> favourites = new ArrayList<>();
}
