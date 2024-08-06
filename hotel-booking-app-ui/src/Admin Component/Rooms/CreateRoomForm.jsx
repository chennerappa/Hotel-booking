/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import axios from "axios";
import { useParams } from "react-router-dom";

const roomType = [
  { value: "Single_Room", label: "Single Room" },
  { value: "Double_Room", label: "Double Room" },
  { value: "Suite_Room", label: "Suite Room" },
  { value: "Premium_Suite_Room", label: "Premium Suite Room" },
];

const cloud_name = "dju7i3ygg";
const cloudinaryUploadPreset = "ludia-food";
const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryUploadPreset);
  formData.append("cloud_name", cloud_name);
  // formData.append("public_id", uuidv4());

  try {
    const response = await axios.post(cloudinaryUploadUrl, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
const CreateRoomForm = ({ onClose, setRooms, fetchRooms }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    // roomNumber: "",
    description: "",
    price: "",
    capacity: "",
    roomType: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];

    for (const file of files) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        imageUrls.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...imageUrls],
    }));
  };

  const handleImageRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: (prevData.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      await axios.post(
        `http://localhost:8080/api/admin/rooms/hotel/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const response = await axios.get(
        "http://localhost:8080/api/admin/hotels",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRooms(response.data);
      onClose();
      fetchRooms();
      console.log("Room created successfully!", response.data);
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };
  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Box my={2}>
          <input
            accept="image/*"
            id="upload-images"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-images">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#646cff" }}
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload Images
            </Button>
          </label>
        </Box>
        <div className="flex flex-wrap gap-2">
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <img className="w-24 h-24 object-cover" src={image} alt="" />
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  outline: "none",
                }}
                onClick={() => handleImageRemove(index)}
              >
                <CloseIcon sx={{ fontSize: "1rem" }} />
              </IconButton>
            </div>
          ))}
        </div>
        {/* <TextField
          fullWidth
          id="roomNumber"
          name="roomNumber"
          label="Room Number"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.roomNumber}
        /> */}
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Room Description"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.description}
        />
        <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.price}
        />
        <TextField
          fullWidth
          id="capacity"
          name="capacity"
          label="Room Capacity"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.capacity}
        />
        <FormControl fullWidth>
          <InputLabel id="roomType-label">Room Type</InputLabel>
          <Select
            labelId="roomType-label"
            id="roomType"
            name="roomType"
            placeholder="Select Room Type"
            label="Room Type"
            value={formData.roomType}
            onChange={handleInputChange}
          >
            {roomType.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" sx={{ bgcolor: "#646cff" }}>
          Create Room
        </Button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
