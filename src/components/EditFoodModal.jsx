import { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { updateMenuItem, addMenuItem } from "../services/api"; // Ensure both functions are imported
import { toast } from "react-toastify";
import { Upload } from "@mui/icons-material";

const EditFoodModal = ({ isOpen, onClose, foodItem, onSave }) => {
  const [editedItem, setEditedItem] = useState(foodItem || {}); // Set foodItem or empty object for creating
  const [selectedImage, setSelectedImage] = useState(null); // Store new image
  const [imagePreview, setImagePreview] = useState(""); // For previewing image
  const [isSaving, setIsSaving] = useState(false); // State to indicate saving

  // Update state when foodItem changes
  useEffect(() => {
    if (foodItem) {
      setEditedItem(foodItem);
      setImagePreview(foodItem.image || ""); // Load existing image
    }
  }, [foodItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview of new image
    }
  };

  const handleSave = async () => {
    if (!editedItem || !editedItem.name) {
      toast.error("Please fill out all required fields!", { position: "top-right" });
      return;
    }

    setIsSaving(true); // Start saving
    try {
      const formData = new FormData();
      formData.append("name", editedItem.name);
      formData.append("description", editedItem.description);
      formData.append("price", editedItem.price);
      formData.append("category", editedItem.category);
      formData.append("inStock", editedItem.inStock);

      if (selectedImage) {
        formData.append("image", selectedImage); // Attach new image if selected
      }

      console.log("Edited Item:", editedItem);
      console.log("Form Data:", formData);

      const accessToken = localStorage.getItem("accessToken");

      let response;
      if (foodItem && foodItem._id) {
        // Edit existing item
        response = await updateMenuItem(foodItem._id, formData, accessToken);
      } else {
        // Create new item
        response = await addMenuItem(formData, accessToken);
      }

      if (response.success) {
        onSave(response.data); // Update item in parent component
        toast.success(foodItem ? "Food item updated successfully!" : "Food item created successfully!", { position: "top-right" });
        onClose(); // Close modal
      } else {
        toast.error(response.message || "Failed to save item", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Something went wrong. Please try again later.", { position: "top-right" });
    }
    setIsSaving(false); // End saving
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
      <Box className="bg-white p-4 rounded-lg shadow-lg mx-auto mt-5 max-w-screen-sm">
        <Typography id="modal-title" variant="h6" className="font-bold text-center">
          {foodItem ? "Edit Food Item Details" : "Add Food Item"}
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={editedItem.name || ""}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="description"
          value={editedItem.description || ""}
          onChange={handleChange}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          name="price"
          type="number"
          value={editedItem.price || ""}
          onChange={handleChange}
        />

        {/* Category Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={editedItem.category || ""}
            onChange={handleChange}
          >
            <MenuItem value="Snacks">Snacks</MenuItem>
            <MenuItem value="Drinks">Drinks</MenuItem>
            <MenuItem value="Meals">Meals</MenuItem>
            <MenuItem value="Desserts">Desserts</MenuItem>
          </Select>
        </FormControl>

        {/* In Stock Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              name="inStock"
              checked={editedItem.inStock || false}
              onChange={handleCheckChange}
            />
          }
          label="In Stock"
        />

        {/* Image Upload Section */}
        <div className="my-4 flex items-center gap-4">
          <Typography variant="body1" className="font-semibold">
            Upload Image:
          </Typography>

          <label htmlFor="image-upload" className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
            <Upload fontSize="small" /> {/* Upload Icon */}
            Choose Image
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Show selected file name */}
        {selectedImage && (
          <Typography variant="body2" className="mt-2 text-gray-600">
            Selected: {selectedImage.name}
          </Typography>
        )}

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-3 flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-md"
            />
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="mt-4 flex justify-between">
          <Button onClick={onClose} color="secondary" size="small">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={isSaving} size="small">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditFoodModal;
