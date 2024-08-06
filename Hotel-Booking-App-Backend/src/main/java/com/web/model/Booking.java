package com.web.model;

import java.time.LocalDate;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	

    private LocalDate checkInDate;
    
    private LocalDate checkOutDate;
    
    private Double totalPrice;
    
    private String bookingStatus;
    
    private Integer numberOfGuests;
    
    private Long hotelId;
    
//    private String specialRequests;
    
    private String createdAt;
    
    private Long adminId;
    
    private String hotelName;
    
//    @JsonIgnore
    @ManyToOne
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
