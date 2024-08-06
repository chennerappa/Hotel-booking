import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import HotelCard from "./HotelCard";
import CreateHotelForm from "./CreateHotelForm";
import axios from "axios";

const HotelList = () => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [hotels, setHotels] = useState([]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleCloseCreateHotel = () => {
    setOpen(false);
  };
  const handleOpenCreateHotel = () => {
    setOpen(true);
  };

  const fetchHotels = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:8080/api/admin/hotels/user_hotels`,
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
    fetchHotels();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <section className="projectListSection w-full pt-10 lg:w-[100%] lg:space-x-24">
        <div className="flex gap-2 items-center pb-5 justify-between w-[100%] lg:w-[90%]">
          <div className="relative p-0 w-full lg:w-[30rem] ">
            <Input
              onChange={handleSearchChange}
              placeholder="Search Hotel"
              className="w-[70%] px-9 border border-black rounded-md pt-1 lg:ml-24"
            />
            <SearchIcon className="absolute top-2 left-3 lg:left-28 -ml-1" />
          </div>
          <div className="-mb-5">
            <span className="text-gray-500">ADD HOTEL</span>
            <IconButton onClick={handleOpenCreateHotel}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div>
          <div className="space-y-5 min-h-[74vh]">
            {hotels
              .filter(
                (project) =>
                  project.hotelName &&
                  project.hotelName
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
              )
              .map((item) => (
                <HotelCard
                  key={item.id}
                  hotel={item}
                  fetchHotels={fetchHotels}
                />
              ))}
          </div>
        </div>
      </section>
      <Dialog
        open={open}
        onClose={handleCloseCreateHotel}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Create a Hotel
            <IconButton
              onClick={handleCloseCreateHotel}
              style={{ float: "right", color: "#646cff", cursor: "pointer" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <CreateHotelForm
            setHotels={setHotels}
            fetchHotels={fetchHotels}
            onClose={handleCloseCreateHotel}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HotelList;
