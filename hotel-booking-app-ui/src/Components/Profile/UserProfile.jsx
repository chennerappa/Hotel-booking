import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const handleLogout = () => {};
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("jwt");
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      console.log("User details", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      className="min-h-[80vh] flex flex-col justify-center
       items-center text-center"
    >
      <div className="flex flex-col items-center justify-center">
        <AccountCircleIcon sx={{ fontSize: "9rem", color: "#646cff" }} />
        <h1 className="text-2xl font-semibold py-5">{user?.fullName}</h1>
        <p>Email: {user?.email}</p>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ margin: "2rem 0rem" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
