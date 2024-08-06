/* eslint-disable no-unused-vars */
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
import RoomCard from "./RoomCard";
import CreateRoomForm from "./CreateRoomForm";
import { useParams } from "react-router-dom";
import axios from "axios";

const Rooms = () => {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { id } = useParams();

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleCloseCreateRoom = () => {
    setOpen(false);
  };
  const handleOpenCreateRoom = () => {
    setOpen(true);
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
      console.log("Error fetching in hotel rooms", error);
    }
  };

  useEffect(() => {
    fetchRoomsByHotelId();
  }, [id]);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <section className="projectListSection w-full pt-10 lg:w-[100%] lg:space-x-24">
          <div className="flex gap-2 items-center pb-5 justify-between w-[100%] lg:w-[90%]">
            <div className="relative p-0 w-full lg:w-[30rem] ">
              <Input
                onChange={handleSearchChange}
                placeholder="Search room"
                className="w-[70%] px-9 border border-black rounded-md pt-1 lg:ml-24"
              />
              <SearchIcon className="absolute top-2 left-3 lg:left-28 -ml-1" />
            </div>
            <div className="-mb-5">
              <span>Add Room</span>
              <IconButton onClick={handleOpenCreateRoom}>
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <div>
            <div className="space-y-5 min-h-[74vh]">
              {rooms
                .filter(
                  (room) =>
                    room.description &&
                    room.description
                      .toLowerCase()
                      .includes(keyword.toLowerCase())
                )
                .map((item) => (
                  <RoomCard
                    key={item}
                    room={item}
                    setRooms={setRooms}
                    fetchRooms={fetchRoomsByHotelId}
                  />
                ))}
            </div>
          </div>
        </section>
        <Dialog
          open={open}
          onClose={handleCloseCreateRoom}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            <div className="font-semibold text-2xl text-indigo-600">
              Create a Room
              <IconButton
                onClick={handleCloseCreateRoom}
                style={{
                  float: "right",
                  color: "#646cff",
                  cursor: "pointer",
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            <CreateRoomForm
              fetchRooms={fetchRoomsByHotelId}
              setRooms={setRooms}
              onClose={handleCloseCreateRoom}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
};

export default Rooms;
