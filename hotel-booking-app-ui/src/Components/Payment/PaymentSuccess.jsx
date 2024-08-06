import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-5 shadow-2xl">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="box border w-full lg:w-2/4 flex flex-col items-center shadow-2xl rounded-md p-5">
          <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
          <h1 className="py-5 text-3xl font-semibold tracking-wide">
            Booking Success!
          </h1>
          <p className="text-center py-3 text-gray-400">
            Thank you for choosing our hotel! We appreciate your booking
          </p>
          <p className="py-2 text-center font-semibold text-gray-600">
            Have A Greate Day!
          </p>
          <Button
            onClick={() => navigate("/profile/bookings")}
            variant="contained"
            className="py-5"
            sx={{ margin: "1rem 0", backgroundColor: "#646cff" }}
          >
            Check Booking Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
