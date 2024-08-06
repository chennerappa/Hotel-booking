/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-constant-condition */
import { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const roles = [
  { value: "ROLE_ADMIN", label: "Admin" },
  { value: "ROLE_CUSTOMER", label: "Customer" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [openMenu, setOpenMenu] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Customer");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetchUserProfile(jwt);
    }
  }, []);

  const fetchUserProfile = async (jwt) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setProfile(response.data);
      setIsAuthenticated(true);
      setUserRole(response.data.role);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsAuthenticated(false);
    }
  };

  const handleOpenLogin = () => setOpen(true);
  const handleCloseLogin = () => setOpen(false);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password,
      });
      const { role, jwt } = response.data;
      localStorage.setItem("jwt", jwt);
      fetchUserProfile(jwt);

      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      handleCloseLogin();
      console.log("Login success", response.data);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        fullName,
        email,
        password,
        role,
      });

      const { jwt } = response.data;
      localStorage.setItem("jwt", jwt);
      fetchUserProfile(jwt);

      setIsLogin(true);
      setError("");
      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      console.log("Signup success....");
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
    setUserRole("");
    setProfile(null);
    navigate("/");
  };

  const handleNavigateProfile = () => {
    navigate("/profile");
  };

  return (
    <Box className="sticky px-5 z-50 py-[.8rem] lg:px-20 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="logo font-bold text-3xl list-none"
        >
          Hotel Booking
        </li>
      </div>
      <div className="space-x-2 lg:space-x-10">
        <div className="cursor-pointer flex flex-row items-center gap-5">
          <div className="flex gap-5 font-semibold text-xl">
            <li className="list-none">FAQ</li>
            <li className="list-none">Support</li>
          </div>
          {isAuthenticated && userRole === "ROLE_CUSTOMER" ? (
            <>
              <Avatar
                onClick={handleClick}
                sx={{
                  bgcolor: "#646cff",
                  color: "white",
                  fontSize: "27px",
                  mt: 1,
                  pt: 0.3,
                  fontWeight: "semiboldbold",
                }}
              >
                {profile?.fullName[0].toUpperCase()}
              </Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleNavigateProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton onClick={handleOpenLogin}>
              <PersonIcon
                sx={{ fontSize: "40px" }}
                className="text-indigo-600 rounded-full"
              />
            </IconButton>
          )}
          <Dialog
            open={open}
            onClose={handleCloseLogin}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>
              <div className="font-semibold text-2xl text-indigo-600">
                {isLogin ? "Login" : "Sign Up"}
                <IconButton
                  onClick={handleCloseLogin}
                  style={{ float: "right", color: "#646cff" }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              <form
                onSubmit={isLogin ? handleSubmit : handleSignupSubmit}
                className="w-[24rem]"
              >
                {error && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {error}
                  </div>
                )}
                {!isLogin && (
                  <TextField
                    fullWidth
                    label="Full Name"
                    margin="normal"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                )}
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isLogin && (
                  <FormControl fullWidth>
                    <InputLabel id="role-label">Select Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      label="Select Role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          {role.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked sx={{ color: "#646cff" }} />
                  }
                  label="Agree Terms & Conditions"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ bgcolor: "#646cff", mt: 2 }}
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
                <p className="mt-2 text-center">
                  {isLogin ? (
                    <>
                      Don't have an account?
                      <span
                        onClick={toggleForm}
                        className="text-blue-500 cursor-pointer"
                      >
                        Sign Up
                      </span>
                    </>
                  ) : (
                    <>
                      Already have an account?
                      <span
                        onClick={toggleForm}
                        className="text-blue-500 cursor-pointer"
                      >
                        Login
                      </span>
                    </>
                  )}
                </p>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
