package com.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.model.Room;
import com.web.model.User;
import com.web.service.RoomService;
import com.web.service.UserService;

@RestController
@RequestMapping("/api/admin/rooms")
public class AdminRoomController {

	@Autowired
	private RoomService roomService;

	@Autowired
	private UserService userService;

	// Create room
	@PostMapping("/hotel/{hotelId}")
	public ResponseEntity<Room> createRoom(@RequestBody Room room, @PathVariable Long hotelId,
			                               @RequestHeader("Authorization") String jwt) throws Exception {
		User admin = userService.findUserByJwtToken(jwt);
		return new ResponseEntity<Room>(roomService.createRoom(room, hotelId, admin.getId()), HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Room>> getAllRooms() {
		return new ResponseEntity<List<Room>>(roomService.getAllRooms(), HttpStatus.OK);
	}

	@GetMapping("/{roomId}")
	public ResponseEntity<Room> findRoomById(@PathVariable Long roomId) throws Exception {
		return new ResponseEntity<Room>(roomService.findRoomById(roomId), HttpStatus.OK);
	}

	@PutMapping("/{roomId}/status")
	public ResponseEntity<Room> updateAvailabilityStatus(@PathVariable Long roomId) throws Exception {
		return new ResponseEntity<Room>(roomService.updateAvailabilityStatus(roomId), HttpStatus.ACCEPTED);
	}

	@GetMapping("/{roomNumber}/room_number")
	public ResponseEntity<Room> findRoomByRoomNumber(@PathVariable long roomNumber) throws Exception {
		return new ResponseEntity<Room>(roomService.findByRoomNumber(roomNumber), HttpStatus.OK);
	}

}
