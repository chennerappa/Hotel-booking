/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import BookingDetails from "./BookingDetails";
import axios from "axios";

const BookingCard = ({ bookings, setBookings }) => {
  const [open, setOpen] = useState(false);

  const handleBookingOpen = () => {
    setOpen(true);
  };
  const handleBookingClose = () => {
    setOpen(false);
  };

  const handleUpdateBookingStatus = async (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token found. Please login again.");
      return;
    }
    const bookingStatus = "CANCELLED";

    try {
      const response = await axios.put(
        `http://localhost:8080/api/booking/${id}/update_status?bookingStatus=${bookingStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings((prevBookings) => {
        return prevBookings.map((booking) =>
          booking.id === id ? { ...booking, bookingStatus } : booking
        );
      });

      console.log("Booking status updated successfully!", response);
    } catch (error) {
      console.error("Failed to update Booking status:", error);
    }
  };

  const getChipColor = (status) => {
    switch (status) {
      case "PENDING":
        return "orange";
      case "CANCELLED":
        return "red";
      case "COMPLETED":
        return "green";
      default:
        return "red";
    }
  };
  return (
    <div className="w-[75%]">
      <Card className="p-0 px-5 w-full bg-gray-50 hover:shadow-xl border rounded-md mb-5 shadow-ml cursor-pointer">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1 py-2">
                <div className="flex items-center gap-8">
                  <h1
                    onClick={handleBookingOpen}
                    className="cursor-pointer font-bold text-lg text-gray-500"
                  >
                    Booking from user {bookings.user?.fullName} to the Room No{" "}
                    {bookings.room?.roomNumber}
                  </h1>
                  <CircleIcon sx={{ fontSize: ".5rem" }} />
                  <Chip
                    className="font-semibold tracking-wider"
                    label={bookings.bookingStatus}
                    sx={{
                      bgcolor: getChipColor(bookings.bookingStatus),
                      color: "white",
                      mt: 1,
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold tracking-wide text-gray-600">
                    Hotel Name:
                  </p>
                  <p className="text-gray-500">{bookings.hotelName}</p>
                </div>
              </div>

              <div className="flex items-center">
                {bookings.bookingStatus === "CANCELLED" ? (
                  ""
                ) : (
                  <Button
                    sx={{ backgroundColor: "red" }}
                    variant="contained"
                    onClick={() => handleUpdateBookingStatus(bookings.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Dialog open={open} onClose={handleBookingClose} fullWidth maxWidth="md">
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Booking Details
            <IconButton
              onClick={handleBookingClose}
              style={{ float: "right", color: "#646cff", cursor: "pointer" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <BookingDetails bookings={bookings} setBookings={setBookings} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingCard;
