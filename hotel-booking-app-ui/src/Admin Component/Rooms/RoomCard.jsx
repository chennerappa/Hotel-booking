/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import RoomDetails from "./RoomDetails";
import RoomUpdateForm from "./RoomUpdateForm";
import CircleIcon from "@mui/icons-material/Circle";

const RoomCard = ({ room, fetchRooms, setRooms }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenRoom = () => {
    setOpen(true);
  };

  const handleCloseRoom = () => {
    setOpen(false);
  };

  const handleOpenUpdateRoom = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdateRoom = () => {
    setOpenUpdate(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteRoom = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/hotels/delete_room/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchRooms();
      return response.data;
    } catch (error) {
      console.error(
        "Error deleting room:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Card
      className="shadow-lg border p-2 rounded-md w-[90%] bg-gray-50 hover:shadow-xl cursor-pointer"
      // style={{ backgroundColor: "#eeef" }}
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[6rem] h-[6rem] object-cover object-top"
              src={
                room.images && room.images.length > 0
                  ? room.images[0]
                  : "fallback_image_url"
              } // Add a fallback image URL here
              alt=""
            />
            <div className="ml-5 space-y-2 pt-1">
              <div className="flex items-center gap-5">
                <p onClick={handleOpenRoom} className="text-xl text-gray-600">
                  Room Number: {room.roomNumber}
                </p>
                <CircleIcon sx={{ fontSize: ".5rem" }} />
                <Chip
                  className="tracking-wider font-semibold"
                  label={room.available ? "Available" : "Not Available"}
                  sx={{
                    bgcolor: room.available ? "green" : "red",
                    color: "white",
                  }}
                />
              </div>
              <p className="opacity-70 text-xs font-semibold">
                {room.description}
              </p>
              <div className="flex text-base gap-5">
                <p className="font-semibold text-gray-600">Room Type:</p>
                <p className="text-gray-500">{room.roomType}</p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="flex justify-end">
            <Button
              id="demo-positioned-button"
              aria-controls={anchorEl ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "#535bf2" }}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem
                onClick={handleOpenUpdateRoom}
                sx={{ color: "#535bf2" }}
              >
                Update
              </MenuItem>
              <MenuItem
                onClick={() => handleDeleteRoom(room.id)}
                sx={{ color: "red" }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleCloseRoom} fullWidth maxWidth="lg">
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Room Details
            <IconButton
              onClick={handleCloseRoom}
              style={{ float: "right", color: "#646cff", cursor: "pointer" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <RoomDetails
            room={room}
            setRooms={setRooms}
            fetchRooms={fetchRooms}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdateRoom}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Update Room Details
            <IconButton
              onClick={handleCloseUpdateRoom}
              style={{ float: "right", color: "#646cff", cursor: "pointer" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <RoomUpdateForm />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RoomCard;
