package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.ROOM_TYPE;
import com.web.model.Room;
import com.web.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
	
	@Autowired
	private RoomService roomService;

	@GetMapping("/filter")
    public List<Room> filterRooms(@RequestParam Long hotelId, 
                                  @RequestParam(required = false) ROOM_TYPE roomType, 
                                  @RequestParam(required = false) Boolean availability) {
        return roomService.getFilteredRooms(hotelId, roomType, availability);
    }
}
