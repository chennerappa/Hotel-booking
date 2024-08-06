import { Route, Routes } from "react-router-dom";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/*" element={<UserRouter />} />
      </Routes>
    </div>
  );
};

export default Routers;
