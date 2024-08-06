package com.web.request;

import java.util.List;

import com.web.model.ROOM_TYPE;

import lombok.Data;

@Data
public class RoomRequest {

	private long roomNumber;

	private ROOM_TYPE roomType;

	private String description;

	private Double price;
	
	private Integer capacity;
	
	private List<String> images;
}
