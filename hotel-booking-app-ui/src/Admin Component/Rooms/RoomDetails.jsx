/* eslint-disable react/prop-types */
import { Chip, Grid } from "@mui/material";
import axios from "axios";

const RoomDetails = ({ room, fetchRooms }) => {
  const handleUpdateAvailability = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.put(
        `http://localhost:8080/api/admin/rooms/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   setRooms(response.data);
      fetchRooms();
      console.log(
        "Room availability status updated successfully.......!",
        response.data
      );
    } catch (error) {
      console.error("Failed to update project status:", error);
    }
  };
  return (
    <div className="flex">
      <div className="w-[60%]">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <img
              className="w-full h-[30vh] object-cover rounded-md"
              src={room.images[0]}
              alt=""
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <img
              className="w-full h-[20vh] object-cover rounded-md"
              src={room.images[1]}
              alt=""
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <img
              className="w-full h-[20vh] object-cover rounded-md"
              src={room.images[1]}
              alt=""
            />
          </Grid>
        </Grid>
      </div>
      <div className="px-8 space-y-5">
        <h1 className="text-2xl font-bold pb-5 tracking-wider text-gray-600">
          Room Details
        </h1>
        <div className="flex text-base">
          <p className="w-[10rem] font-semibold text-gray-600">Room Number: </p>
          <p className="text-gray-500">{room.roomNumber}</p>
        </div>
        <div className="flex text-base">
          <p className="w-[12.5rem] font-semibold text-gray-600">
            Description:
          </p>
          <p className="text-gray-500">{room.description}</p>
        </div>
        <div className="flex text-base">
          <p className="w-[10rem] font-semibold text-gray-600">Price:</p>
          <p className="text-gray-500">₹{room.price}</p>
        </div>
        <div className="flex text-base">
          <p className="w-[10rem] font-semibold text-gray-600">Room Type:</p>
          <p className="text-gray-500">{room.roomType}</p>
        </div>
        <div className="flex text-base">
          <p className="w-[10rem] font-semibold text-gray-600">Created At:</p>
          <p className="text-gray-500">{room.createdAt}</p>
        </div>
        <div className="flex text-base">
          <p className="w-[10rem] font-semibold text-gray-600">
            Availability:{" "}
          </p>
          <Chip
            onClick={() => handleUpdateAvailability(room.id)}
            className="tracking-wider font-semibold"
            label={room.available ? "Available" : "Not Available"}
            sx={{
              bgcolor: room.available ? "green" : "red",
              color: "white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
