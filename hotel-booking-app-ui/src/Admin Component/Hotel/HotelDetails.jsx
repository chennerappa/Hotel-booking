/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Input,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Rooms from "../Rooms/Rooms";
import Bookings from "../Hotel Bookings/HotelBookings";
import axios from "axios";

const HotelDetails = () => {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const { id } = useParams();

  const handleViewRooms = () => {
    navigate(`/admin/hotels/${hotel.id}/rooms`);
  };

  const handleViewBookings = () => {
    navigate(`/admin/hotels/${hotel.id}/bookings`);
  };

  const fetchHotelById = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/admin/hotels/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHotel(response.data);
      console.log("fetching the hotel using id", response.data);
    } catch (error) {
      console.log("Error fetching hotel", error);
    }
  };

  useEffect(() => {
    fetchHotelById();
  }, [id]);

  if (!hotel) {
    return (
      <div className="flex justify-center items-center bg-slate-200 h-screen">
        <div className="text-3xl tracking-widest bg-transparent w-[10rem] h-[10rem] bg-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5">
      <div className="flex justify-between">
        <div className="text-2xl tracking-widest text-gray-600">HOTEL</div>
        <div className="flex">
          <div className="mr-5 pt-2">
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon
                sx={{ fontSize: "30px" }}
                className="text-gray-600 rounded-full cursor-pointer"
              />
            </Badge>
          </div>
          <div>
            <IconButton>
              <PersonIcon
                sx={{ fontSize: "30px" }}
                className="text-gray-600 rounded-full"
              />
            </IconButton>
          </div>
        </div>
      </div>
      <div
        className="mt-8 shadow-md w-[6.5rem] rounded-full "
        style={{ backgroundColor: "#646cff" }}
      >
        <IconButton onClick={() => navigate("/admin/hotels")}>
          <ArrowBackIcon className="text-white" />
          <span className="text-white">Back</span>
        </IconButton>
      </div>
      <section className=" border-b border-b-gray-300">
        <h3 className="text-gray-400 py-2 mt-2">
          Home/
          <span>{hotel?.country}/</span>
          <span>{hotel?.city}/</span>
          <span>{hotel?.hotelName}/</span>
          <span>{hotel?.id}</span>
        </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover rounded-md"
                src={hotel?.images[0]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover rounded-md"
                src={hotel?.images[1]}
                alt=""
              />
            </Grid>
          </Grid>
        </div>
        <div className="flex justify-between">
          <div className="pt-3 pb-5">
            <h1 className="text-4xl font-medium text-gray-700 tracking-wider">
              {hotel?.hotelName}
            </h1>
            <p className="text-gray-500 mt-1">{hotel?.description}</p>
            <div className="space-y-3 mt-3">
              <p className="text-gray-500 flex items-center gap-3">
                <LocationOnIcon />
                <div>
                  <span>{hotel?.address}, </span>
                  <span>{hotel?.city}, </span>
                  <span>{hotel?.state}, </span>
                  <span>{hotel?.country}, </span>
                  <span>{hotel?.zipCode}</span>
                </div>
              </p>
              <p className="text-gray-500 flex items-center gap-3">
                <CalendarTodayIcon />
                <span>Hotel Status is Opening</span>
              </p>
            </div>
          </div>
          <div className="flex items-center mr-10">
            <div className="flex gap-5">
              <Button
                onClick={handleViewRooms}
                sx={{ backgroundColor: true ? "#535bf2" : "red" }}
                className="py-[1rem] px-[2rem] rounded-full"
                variant="contained"
                // onClick={handleRestaurantStatus}
                size="large"
              >
                {/* {false ? "Close" : "Open"} */}
                View Rooms
              </Button>
              <Button
                onClick={handleViewBookings}
                sx={{ backgroundColor: true ? "#535bf2" : "red" }}
                className="py-[1rem] px-[2rem] rounded-full"
                variant="contained"
                // onClick={handleRestaurantStatus}
                size="large"
              >
                {/* {false ? "Close" : "Open"} */}
                View Bookings
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="secondSection">
        <Routes>
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </section>
    </div>
  );
};

export default HotelDetails;
