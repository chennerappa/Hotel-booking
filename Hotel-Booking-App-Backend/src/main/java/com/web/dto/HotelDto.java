package com.web.dto;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class HotelDto {

	private Long id;
	
	private String hotelName;
	
	@Column(length = 1000)
	private List<String> images;
	
	private String description;
	
	private boolean open;
	
}