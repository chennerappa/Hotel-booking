import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import World from "./World";
import axios from "axios";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./Activity.css";

const DashboardCard = () => {
  //   const [keyword, setKeyword] = useState("");
  const [activities, setActivities] = useState([]);

  const handleSearchChange = () => {
    // setKeyword(e.target.value);
  };

  const fetchAllActivities = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/bookings/activities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setActivities(response.data);
      console.log("All activities", response.data);
    } catch (error) {
      console.log("error fetching in activities", error);
    }
  };

  useEffect(() => {
    fetchAllActivities();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl tracking-widest">DASHBOARD</div>
        <div className="flex">
          <div className="relative -mr-5">
            <Input
              onChange={handleSearchChange}
              placeholder="Search here"
              className="w-[70%] px-9 border rounded-md pt-1"
            />
            <SearchIcon className="absolute top-2 left-3" />
          </div>
          <div className="mr-5">
            <IconButton>
              <NotificationsIcon
                sx={{ fontSize: "30px" }}
                className="text-black rounded-full"
              />
            </IconButton>
          </div>
          <div>
            <IconButton>
              <PersonIcon
                sx={{ fontSize: "30px" }}
                className="text-black rounded-full"
              />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="w-full border rounded-md bg-white shadow-lg mt-16 px-6 py-6">
        <div>
          <h1 className="text-2xl tracking-wider">
            Global Sales by Top Locations
          </h1>
        </div>
        <div className="flex gap-24 mt-8">
          <div className="border-white">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, border: "none" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #ddd",
                      }}
                    >
                      Country
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #ddd",
                      }}
                    >
                      Guest
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #ddd",
                      }}
                    >
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <TableRow
                      key={item}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ borderBottom: "1px solid #ddd" }}
                      >
                        {"India"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #ddd" }}
                      >
                        {"Srinu"}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ borderBottom: "1px solid #ddd" }}
                      >
                        {"23959.00"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div>
            <World />
          </div>
        </div>
      </div>
      <div className="mt-14">
        <div>
          <h1 className="text-3xl font-normal tracking-widest">
            Manage Listings
          </h1>
        </div>
        <div className="w-full flex flex-wrap justify-around mt-14">
          <div className="w-[30%] shadow-xl rounded-md px-5 py-5 bg-white">
            <div>
              <img
                className="rounded-md relative -top-10"
                src="https://demos.creative-tim.com/material-dashboard-pro-angular2/assets/img/card-1.jpg"
                alt=""
              />
            </div>
            <div className="border-b pb-4">Sample</div>
          </div>
          <div className="w-[30%] shadow-xl rounded-md px-5 py-5 bg-white">
            <div>
              <img
                className="rounded-md relative -top-10"
                src="https://demos.creative-tim.com/material-dashboard-pro-angular2/assets/img/card-3.jpg"
                alt=""
              />
            </div>
            <div className="border-b pb-4">Sample</div>
          </div>
          <div className="w-[30%] shadow-xl rounded-md px-5 py-5 bg-white">
            <div>
              <img
                className="rounded-md relative -top-10"
                src="https://demos.creative-tim.com/material-dashboard-pro-angular2/assets/img/card-3.jpg"
                alt=""
              />
            </div>
            <div className="border-b pb-4">Sample</div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div>
          <h1 className="text-3xl font-normal tracking-widest">
            User Activities
          </h1>
        </div>
        <div className="mt-6 mb-32 ">
          <div className="w-[50%] border bg-white h-[60vh] mx-5 shadow-xl rounded-md py-3 overflow-visible">
            <h1
              // style={{ color: "#646cff" }}
              className="mb-5 py-3 mx-5 text-2xl tracking-wide"
            >
              Booking Activity
            </h1>
            <div className="space-y-3 overflow-y-auto h-[48vh] activity-feed-container">
              {activities.map((activity) => (
                <div key={activity} className="flex flex-col items-center">
                  <Card className="border shadow-sm w-[90%] py-3">
                    <div className="flex items-center gap-4 ml-2">
                      <CircleIcon sx={{ fontSize: ".5rem" }} />
                      <p className="text-xl text-blue-800 tracking-wider">
                        {activity.message}
                      </p>
                    </div>
                    <p className="text-sm px-8 text-gray-500">
                      {activity.date}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
