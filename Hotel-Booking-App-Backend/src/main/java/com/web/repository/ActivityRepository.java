package com.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.model.Activity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long>{

}
