import axios from "axios";
import HotelCard from "../Home/HotelCard";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

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

  return (
    <div>
      <h1 className="py-5 text-xl text-center font-semibold">My Favorites</h1>

      <div className="flex flex-wrap justify-center gap-5">
        {favorites.map((item) => (
          <HotelCard key={item.id} hotel={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
