package com.web.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Double rating;

	private String comment;

	private LocalDateTime createdAt;

	private Boolean isApproved;
	
	private String reviewerName;

	@JsonIgnore
	@ManyToOne
	private Hotel hotel;

	@JsonIgnore
	@ManyToOne
	private User user;
}
