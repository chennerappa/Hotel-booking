import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import BookingsCard from "./BookingsCard";
import { useEffect, useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import axios from "axios";

const Bookings = () => {
  // const [keyword, setKeyword] = useState("");
  const [bookings, setBookings] = useState([]);
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  // const handleSearchChange = () => {
  //   // setKeyword(e.target.value);
  // };

  const handleRoomChange = async (e) => {
    const roomNumber = e.target.value;
    setSelectedRoom(roomNumber);
    if (roomNumber) {
      await fetchBookingsByRoomNumber(roomNumber);
    } else {
      await fetchBookingsByHotelId();
    }
  };

  const fetchBookingsByHotelId = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/admin/bookings/hotel_bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data);
      console.log("Fetching bookings by hotel id:", response.data);
    } catch (error) {
      console.log("Error fetching hotel bookings", error);
    }
  };

  const fetchBookingsByRoomNumber = async (roomNumber) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/admin/bookings/search_bookings`,
        {
          params: { roomNumber },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data);
      console.log("Fetching bookings by room number:", response.data);
    } catch (error) {
      console.log("Error fetching bookings by room number", error);
    }
  };

  const fetchRoomsByHotelId = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/admin/hotels/${id}/rooms`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRooms(response.data);
      console.log("Fetching rooms by hotel id:", response.data);
    } catch (error) {
      console.log("Error fetching hotel rooms", error);
    }
  };

  useEffect(() => {
    fetchBookingsByHotelId();
    fetchRoomsByHotelId();
  }, [id]);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <section className="projectListSection w-full pt-10 lg:w-[100%] lg:space-x-24">
          <div className="flex gap-2 items-center pb-5 justify-between w-[100%] lg:w-[90%]">
            <div className="relative p-0 w-full lg:w-[30rem] ">
              {/* <Input
                onChange={handleSearchChange}
                placeholder="Search Hotel"
                className="w-[70%] px-9 border border-black rounded-md pt-1 lg:ml-24"
              />
              <SearchIcon className="absolute top-2 left-3 lg:left-28 -ml-1" /> */}
            </div>
            <div className="w-[30%]">
              <form>
                <FormControl fullWidth>
                  <InputLabel id="roomType-label">Search by Room</InputLabel>
                  <Select
                    labelId="roomType-label"
                    id="roomType"
                    name="roomType"
                    value={selectedRoom}
                    onChange={handleRoomChange}
                    label="Search by Room"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {rooms.map((room) => (
                      <MenuItem key={room.id} value={room.roomNumber}>
                        {room.roomNumber}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            </div>
          </div>
          <div>
            <div className="space-y-5 min-h-[74vh] mb-36">
              {bookings.map((item) => (
                <BookingsCard
                  key={item.id}
                  bookings={item}
                  setBookings={setBookings}
                  fetchBookings={fetchBookingsByHotelId}
                />
              ))}
            </div>
          </div>
        </section>
      </Box>
    </div>
  );
};

export default Bookings;
