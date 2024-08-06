/* eslint-disable react/prop-types */
import { Chip } from "@mui/material";

const BookingDetails = ({ bookings }) => {
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
            label={bookings.bookingStatus}
            sx={{
              bgcolor: getChipColor(bookings.bookingStatus),
              color: "white",
            }}
          />
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
