import { Route, Routes } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Dashboard from "../Dashboard/Dashboard";
import Hotel from "../Hotel/Hotel";
import HotelDetails from "../Hotel/HotelDetails";
import AdminBookings from "../Admin Bookings/AdminBookings";
import "../Dashboard/Activity.css";

const Admin = () => {
  return (
    <div className="">
      <div className="lg:flex justify-between">
        <div>
          <AdminSidebar />
        </div>
        <div className="lg:w-[80%] overflow-y-auto h-[100vh] activity-feed-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/hotels/*" element={<Hotel />} />
            <Route path="/hotels/:id/*" element={<HotelDetails />} />
            {/* <Route path="/hotels/:id/rooms" element={<Rooms />} /> */}
            <Route path="/booking/*" element={<AdminBookings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
