import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import BookingsCard from "../Hotel Bookings/BookingsCard";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const jwt = localStorage.getItem("jwt");

  const handleHotelChange = async (e) => {
    const hotelname = e.target.value;
    setSelectedHotel(hotelname);
    if (hotelname) {
      await fetchBookingsByHotelId(hotelname);
    } else {
      await fetchBookingsByAdminId();
    }
  };

  const fetchBookingsByAdminId = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/admin/bookings/admin_bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data);
      console.log("Fetching bookings by admin id:", response.data);
    } catch (error) {
      console.log("Error fetching admin bookings", error);
    }
  };

  const fetchBookingsByHotelId = async (hotelname) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/admin/bookings/hotel_bookings`,
        {
          params: { hotelName: hotelname }, // Corrected parameter name
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data);
      console.log("Fetching bookings by hotel name:", response.data);
    } catch (error) {
      console.log("Error fetching bookings by hotel name", error);
    }
  };

  const fetchHotels = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/admin/hotels`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHotels(response.data);
      console.log("Hotels data", response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchBookingsByAdminId();
    fetchHotels();
  }, [jwt]);

  return (
    <div className="mb-36">
      <div className="flex justify-between my-6 mx-6">
        <div className="text-2xl tracking-widest">BOOKINGS</div>
        <div className="flex">
          <div className="relative -mr-5">
            <Input
              //   onChange={handleSearchChange}
              placeholder="Search here"
              className="w-[70%] px-9 border rounded-md pt-1"
            />
            <SearchIcon className="absolute top-2 left-3" />
          </div>
          <div className="mr-5">
            <IconButton>
              <NotificationsIcon
                sx={{ fontSize: "30px" }}
                className="text-black rounded-full"
              />
            </IconButton>
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <section className="projectListSection w-full pt-10 lg:w-[100%] lg:space-x-24">
          <div className="flex gap-2 items-center pb-5 justify-between w-[100%] lg:w-[90%]">
            <div className="relative p-0 w-full lg:w-[30rem] "></div>
            <div className="w-[50%]">
              <form>
                <FormControl fullWidth>
                  <InputLabel id="roomType-label">Search by Hotel</InputLabel>
                  <Select
                    labelId="roomType-label"
                    id="roomType"
                    name="roomType"
                    value={selectedHotel}
                    onChange={handleHotelChange}
                    label="Search by Hotel"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {hotels.map((hotel) => (
                      <MenuItem key={hotel.id} value={hotel.hotelName}>
                        {hotel.hotelName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            </div>
          </div>
          <div>
            <div className="space-y-5 min-h-[74vh]">
              {bookings.map((item) => (
                <BookingsCard
                  key={item.id}
                  bookings={item}
                  setBookings={setBookings}
                  fetchBookings={fetchBookingsByAdminId}
                />
              ))}
            </div>
          </div>
        </section>
      </Box>
    </div>
  );
};

export default AdminBookings;
