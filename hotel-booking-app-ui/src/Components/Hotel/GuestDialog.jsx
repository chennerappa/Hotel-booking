/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
} from "@mui/material";

const GuestDialog = ({ open, onClose, numGuests, onChange }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select number of guests</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Input
            type="number"
            value={numGuests}
            onChange={(e) => onChange(parseInt(e.target.value))}
            inputProps={{ min: 1 }}
          />
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default GuestDialog;
