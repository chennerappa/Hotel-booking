package com.web.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String hotelName;
	
	private String description;
	
	private LocalDate registrationDate;
	
	private String address;
	
    private String city;
    
    private String state;
    
    private String country;
    
    private String zipCode;
    
    private String phone;
    
    private String email;
	
	private boolean open;
	
//	private Long adminId;
	
	@ElementCollection
	@Column(length = 1000)
	private List<String> images;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User owner;
	
	@OneToMany(mappedBy = "hotel",cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Room> rooms = new ArrayList<>();
	
	@OneToMany
	private List<Review> reviews = new ArrayList<>();
}
