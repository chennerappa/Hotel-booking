/* eslint-disable react/prop-types */
import { Chip, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const bookingStatusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const BookingDetails = ({ bookings, setBookings }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getChipColor = (status) => {
    switch (status) {
      case "PENDING":
        return "orange";
      case "CANCELLED":
        return "RED";
      case "COMPLETED":
        return "green";
      default:
        return "red";
    }
  };

  const handleUpdateBookingStatus = async (id, bookingStatus) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token found. Please login again.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/admin/bookings/${id}/update_status?bookingStatus=${bookingStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the booking status in the state
      setBookings((prevBookings) => {
        return prevBookings.map((booking) =>
          booking.id === id ? { ...booking, bookingStatus } : booking
        );
      });

      handleClose();
      console.log("Booking status updated successfully!", response);
    } catch (error) {
      console.error("Failed to update Booking status:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-[55%] border-r space-y-3 mr-5">
        <div className="flex text-base gap-5">
          <p className="w-36 font-semibold tracking-wide text-gray-600">
            Check In Date:
          </p>
          <p>{bookings.checkInDate}</p>
        </div>
        <div className="flex text-base gap-5">
          <p className="w-36 font-semibold tracking-wide text-gray-600">
            Check Out Date:
          </p>
          <p>{bookings.checkOutDate}</p>
        </div>
        <div className="flex text-base gap-5">
          <p className="w-36 font-semibold tracking-wide text-gray-600">
            Total Price:
          </p>
          <p>{bookings.totalPrice}</p>
        </div>
        <div className="flex text-base gap-5">
          <p className="w-36 font-semibold tracking-wide text-gray-600">
            No. Of Guests:
          </p>
          <p>{bookings.numberOfGuests}</p>
        </div>
        <div className="flex text-base gap-5">
          <p className="w-36 font-semibold tracking-wide text-gray-600">
            Created At:
          </p>
          <p>{bookings.createdAt}</p>
        </div>
        <div className="flex text-base gap-5">
          <p className="w-36 font-semibold tracking-wide text-gray-600">
            Booking Status:
          </p>
          <Chip
            onClick={handleClick}
            label={bookings.bookingStatus}
            sx={{
              bgcolor: getChipColor(bookings.bookingStatus),
              color: "white",
            }}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {bookingStatusOptions.map((status) => (
              <MenuItem
                key={status.value}
                onClick={() =>
                  handleUpdateBookingStatus(bookings.id, status.value)
                }
              >
                {status.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>

      <div>
        <div className="space-y-3 pb-5 mb-5">
          <h1 className="text-2xl font-bold pb-2">Customer Details</h1>
          <div className="flex text-base gap-5">
            <p className="w-36 font-semibold tracking-wide text-gray-600">
              Customer Name:
            </p>
            <p>{bookings.user.fullName}</p>
          </div>
          <div className="flex text-base gap-5">
            <p className="w-36 font-semibold tracking-wide text-gray-600">
              Customer Email:
            </p>
            <p>{bookings.user.email}</p>
          </div>
        </div>
        <div className="space-y-3 mb-5">
          <h1 className="text-2xl font-bold pb-3">Room Details</h1>
          <div className="flex text-base gap-5">
            <p className="w-36 font-semibold tracking-wide text-gray-600">
              Room Number:
            </p>
            <p>{bookings.room.roomNumber}</p>
          </div>
          <div className="flex text-base gap-5">
            <p className="w-36 font-semibold tracking-wide text-gray-600">
              Room Price:
            </p>
            <p>{bookings.room.price}</p>
          </div>
          <div className="flex text-base gap-5">
            <p className="w-36 font-semibold tracking-wide text-gray-600">
              Room Capacity:
            </p>
            <p>{bookings.room.capacity}</p>
          </div>
          <div className="flex text-base gap-5">
            <p className="w-36 font-semibold tracking-wide text-gray-600">
              Room Type:
            </p>
            <p>{bookings.room.roomType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
