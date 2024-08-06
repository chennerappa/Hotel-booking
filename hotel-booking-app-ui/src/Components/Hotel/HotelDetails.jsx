/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RoomCard from "./RoomCard";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import GuestDialog from "./GuestDialog";

const roomTypes = [
  { label: "All", value: "All" },
  { label: "Single Room", value: "Single_Room" },
  { label: "Double Room", value: "Double_Room" },
  { label: "Suite Room", value: "Suite_Room" },
  { label: "Premium Suite Room", value: "Premium_Suite_Room" },
];

const availabilityOptions = [
  { label: "Available", value: "Available" },
  { label: "Not Available", value: "Not_Available" },
];

const HotelDetails = () => {
  const [hotel, setHotel] = useState(null);
  const [roomType, setRoomType] = useState("All");
  const [availability, setAvailability] = useState("");
  const [rooms, setRooms] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const [guestDialogOpen, setGuestDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchHotelById = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/hotels/${id}`,
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

  const fetchFilteredRooms = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        "http://localhost:8080/api/rooms/filter",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            hotelId: id,
            roomType: roomType !== "All" ? roomType : null,
            availability: availability === "Available" ? true : null,
          },
        }
      );
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms", error);
    }
  };

  useEffect(() => {
    fetchHotelById();
  }, [id]);

  useEffect(() => {
    fetchFilteredRooms();
  }, [roomType, availability]);

  const handleGuestDialogOpen = () => {
    setGuestDialogOpen(true);
  };

  const handleGuestDialogClose = () => {
    setGuestDialogOpen(false);
  };

  const handleNumGuestsChange = (newNumGuests) => {
    setNumGuests(newNumGuests);
    handleGuestDialogClose();
  };

  if (!hotel) {
    return (
      <div className="flex justify-center items-center bg-slate-200 h-screen">
        <div className="text-3xl tracking-widest bg-transparent w-[10rem] h-[10rem]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="px-14 pt-5">
      <div
        className="mt-8 shadow-md w-[6.5rem] rounded-full "
        style={{ backgroundColor: "#646cff" }}
      >
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon className="text-white" />
          <span className="text-white">Back</span>
        </IconButton>
      </div>
      <section className="">
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
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex w-[90%] relative px-36 justify-center ml-20">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          className="search-bar w-[80%] flex justify-around shadow-lg"
          p={2}
          border={1}
          borderColor="grey.200"
          borderRadius={2}
          mb={4}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              sx={{ mr: 6 }}
              label="Check-in date"
              value={checkInDate}
              onChange={(newValue) => {
                setCheckInDate(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} className="mr-10" />
              )}
            />
            <DatePicker
              sx={{ mr: 6 }}
              label="Check-out date"
              value={checkOutDate}
              onChange={(newValue) => {
                setCheckOutDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl
            variant="outlined"
            style={{ marginLeft: ".1rem", flex: 1 }}
          >
            <Input
              startAdornment={<PersonIcon />}
              placeholder={`${numGuests} guests`}
              onClick={handleGuestDialogOpen}
              readOnly
            />
          </FormControl>
          {/* <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "1rem" }}
          >
            Search
          </Button> */}
        </Box>
        <GuestDialog
          open={guestDialogOpen}
          onClose={handleGuestDialogClose}
          onChange={handleNumGuestsChange}
        />
      </section>
      <section className="pt-[2rem] lg:flex relative px-36">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-10 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Room Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={(e) => setRoomType(e.target.value)}
                  name="room_type"
                  value={roomType}
                >
                  {roomTypes.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Room Availability
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={(e) => setAvailability(e.target.value)}
                  name="room_availability"
                  value={availability}
                >
                  {availabilityOptions.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-10 lg:w-[80%] lg:pl-10">
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <RoomCard
                room={room}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                numGuests={numGuests}
              />
            </Grid>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HotelDetails;
