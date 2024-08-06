import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import HotelDetails from "../Hotel/HotelDetails";
import Profile from "../Profile/Profile";
import PaymentSuccess from "../Payment/PaymentSuccess";

const UserRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:city/:id/*" element={<HotelDetails />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
};

export default UserRouter;
