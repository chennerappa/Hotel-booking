/* eslint-disable react/prop-types */
import {
  Card,
  Chip,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { format } from "date-fns"; // You can use date-fns for date formatting
import RoomDetails from "./RoomDetails";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const RoomCard = ({ room, checkInDate, checkOutDate, numGuests }) => {
  const [open, setOpen] = useState(false);

  const handleOpenRoom = () => {
    setOpen(true);
  };

  const handleCloseRoom = () => {
    setOpen(false);
  };
  const handleBookNow = async () => {
    try {
      const token = localStorage.getItem("jwt");

      const formattedCheckInDate = format(new Date(checkInDate), "yyyy-MM-dd");
      const formattedCheckOutDate = format(
        new Date(checkOutDate),
        "yyyy-MM-dd"
      );

      const { data } = await axios.post(
        `http://localhost:8080/api/booking/create`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            roomId: room.id,
            checkIn: formattedCheckInDate,
            checkOut: formattedCheckOutDate,
            numberOfGuests: numGuests,
          },
        }
      );

      if (data.payment_url) {
        window.location.href = data.payment_url;
      }

      // if (response.status === 201) {
      //   alert("Booking created successfully!");
      // } else {
      //   alert("Failed to create booking.");
      // }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred while creating the booking.");
    }
  };

  return (
    <Card className="shadow-lg border p-2 rounded-md w-[90%] bg-gray-50 hover:shadow-xl cursor-pointer">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[6rem] h-[6rem] object-cover object-top"
              src={
                room.images && room.images.length > 0
                  ? room.images[0]
                  : "fallback_image_url"
              }
              alt=""
            />
            <div className="ml-5 space-y-2 pt-1 w-[80%]">
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
              {room.available && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              )}
            </div>
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
          <RoomDetails room={room} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default RoomCard;
