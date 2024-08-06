import { TextField, Slider, Button, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HotelCard from "./HotelCard";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(`http://localhost:8080/api/hotels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHotels(response.data);
      console.log("Hotels data", response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div
      className="relative bg-cover bg-center h-[80vh]"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dju7i3ygg/image/upload/v1721152179/vrm8nyesmfyptnwqi9to.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-6">Search your Holiday</h1>
        {/* <div className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl">
          <TextField
            label="Search your destination"
            variant="outlined"
            defaultValue="Dublin"
            InputProps={{
              startAdornment: (
                <IconButton position="start">
                  <LocationOnIcon />
                </IconButton>
              ),
            }}
            className="flex-1"
          />
          <TextField
            label="Select your date"
            variant="outlined"
            type="date"
            defaultValue="2022-09-18"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <IconButton position="start">
                  <CalendarTodayIcon />
                </IconButton>
              ),
            }}
            className="flex-1"
          />
          <div className="flex flex-col items-start flex-1">
            <label className="text-gray-700 mb-2">Max price:</label>
            <Slider
              defaultValue={5000}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={100}
              marks
              min={0}
              max={10000}
              className="w-full"
            />
          </div>
          <Button variant="contained" color="primary">
            More Filters
          </Button>
        </div> */}
      </div>
      <div className="py-10 px-4 bg-gray-100">
        <h2 className="text-3xl font-semibold tracking-wider mb-6 ml-14">
          Trending Destinations
        </h2>
        <div className="flex flex-wrap justify-center">
          {hotels.map((hotel) => (
            <HotelCard key={hotel} hotel={hotel} fetchHotels={fetchHotels} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
