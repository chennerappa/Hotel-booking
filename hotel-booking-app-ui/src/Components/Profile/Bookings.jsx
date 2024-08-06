import axios from "axios";
import { useEffect, useState } from "react";
import BookingCard from "../Booking/BookingCard";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const { data } = await axios.get(
          "http://localhost:8080/api/booking/user_bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(data);
        console.log("User bookings", data);
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div>
      <h1 className="py-5 text-xl text-center font-semibold tracking-wider text-gray-600">
        MY BOOKINGS
      </h1>

      <div className="flex flex-wrap justify-center gap-5">
        {bookings.map((item) => (
          <BookingCard
            key={item.id}
            bookings={item}
            setBookings={setBookings}
          />
        ))}
      </div>
    </div>
  );
};

export default Bookings;
