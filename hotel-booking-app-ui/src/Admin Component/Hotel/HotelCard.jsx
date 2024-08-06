/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Card, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

const HotelCard = ({ hotel, fetchHotels }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleDeleteHotel = async (id) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/admin/hotels/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchHotels();
      return response.data;
    } catch (error) {
      console.error(
        "Error deleting employee:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <Card className="shadow-lg hover:shadow-xl  border  p-2 rounded-md w-[90%] bg-gray-100">
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex cursor-pointer">
            <img
              className="w-[6rem] h-[6rem] object-cover object-top"
              src={hotel.images[0]}
              alt=""
            />
            <div className="ml-5 space-y-2">
              <p
                onClick={() => navigate(`/admin/hotels/${hotel.id}`)}
                className="text-2xl"
              >
                {hotel.hotelName}
              </p>
              <p className="opacity-70 text-xs font-semibold">
                {hotel.description}
              </p>
              <div className="-ml-3">
                <IconButton>
                  <LocationOnIcon />
                </IconButton>
                <span className="text-xs font-semibold">
                  {hotel.address}, {hotel.city}, {hotel.state}
                </span>
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
              open={anchorEl}
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
                // onClick={handleUpdateProjectOpen}
                sx={{ color: "#535bf2" }}
              >
                Update
              </MenuItem>
              <MenuItem
                onClick={() => handleDeleteHotel(hotel.id)}
                sx={{ color: "red" }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default HotelCard;
