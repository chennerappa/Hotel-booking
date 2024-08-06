import { Grid } from "@mui/material";
import HotelList from "./HotelList";

const Hotel = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <HotelList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Hotel;
