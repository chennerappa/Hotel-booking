/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const HotelCard = ({ hotel }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const { data } = await axios.get(
          "http://localhost:8080/api/users/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (Array.isArray(data)) {
          setFavorites(data);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching favorites", error);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, []);

  const handleNavigateToHotel = () => {
    navigate(`/hotels/${hotel.city}/${hotel.id}`);
  };

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.put(
        `http://localhost:8080/api/hotels/${hotel.id}/add-favorites`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(data)) {
        setFavorites(data);
        console.log("Added to favourites", data);
      } else {
        console.error("Server response is not an array:", data);
      }
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };

  const isPresentInFavorites = (favorites, hotel) => {
    if (!Array.isArray(favorites)) {
      return false;
    }
    return favorites.some((favHotel) => favHotel.id === hotel.id);
  };

  return (
    <Card
      className={`${
        hotel.open ? "cursor-pointer" : "cursor-not-allowed opacity-70"
      } max-w-sm w-full md:w-1/3 m-4 border rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.05]`}
    >
      <div
        className={`${
          hotel.open ? "cursor-pointer" : "cursor-not-allowed"
        } relative`}
        onClick={handleNavigateToHotel}
      >
        <img
          className="w-full h-[15rem] rounded-t-md object-cover"
          src={hotel.images[0]}
          alt=""
        />
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={hotel.open ? "success" : "error"}
          label={hotel.open ? "Open" : "Closed"}
        />
      </div>
      <div className="textPart p-4 lg:flex justify-between w-full">
        <div className="space-y-1">
          <p
            onClick={handleNavigateToHotel}
            className="text-lg font-semibold cursor-pointer"
          >
            {hotel.hotelName}
          </p>
          <p className="text-sm text-gray-500">{hotel.description}</p>
        </div>
        <div>
          <IconButton onClick={handleAddToFavorites}>
            {isPresentInFavorites(favorites, hotel) ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
