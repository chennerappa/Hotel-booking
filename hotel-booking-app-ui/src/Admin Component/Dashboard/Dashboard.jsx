import { Grid } from "@mui/material";
import DashboardCard from "./DashboardCard";

const Dashboard = () => {
  return (
    <div className="px-8 py-5">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <DashboardCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
