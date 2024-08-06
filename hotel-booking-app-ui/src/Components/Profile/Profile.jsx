/* eslint-disable no-unused-vars */
import { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import Favorites from "./Favorites";
import Bookings from "./Bookings";

const Profile = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="lg:flex justify-between ">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation open={openSidebar} />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
