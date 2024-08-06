/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

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

const CreateHotelForm = ({ onClose, setHotels }) => {
  const [formData, setFormData] = useState({
    hotelName: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
    email: "",
    images: [],
  });

  const handleImageUpload = async (e) => {
    // const files = Array.from(e.target.files);
    // const imagePreviews = files.map((file) => URL.createObjectURL(file));
    // setFormData((prevData) => ({
    //   ...prevData,
    //   images: [...prevData.images, ...imagePreviews], // Spread the image URLs into the array
    // }));

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      await axios.post("http://localhost:8080/api/admin/hotels", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axios.get(
        "http://localhost:8080/api/admin/hotels/user_hotels",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHotels(response.data);
      onClose();
      console.log("Hotel created successfully!", formData);
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} className="flex flex-wrap gap-5">
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="hotelName"
              name="hotelName"
              label="Hotel Name"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.name}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.description}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Street Address"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.address}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.city}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="state"
              name="state"
              label="State"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.state}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="country"
              name="country"
              label="Country"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.country}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="postalCode"
              name="zipCode"
              label="Zip Code"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.zipCode}
            ></TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.email}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              variant="outlined"
              onChange={handleInputChange}
              value={formData.phone}
            ></TextField>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            className="mx-10"
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#646cff", my: 2 }}
          >
            Create Hotel
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default CreateHotelForm;
