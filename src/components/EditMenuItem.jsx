import { useState, useEffect } from "react";
import { updateMenuItem } from "../services/api"; // Ensure this function is correctly defined
import { Modal, Box, Typography, Button, TextField } from "@mui/material";

const EditMenuItem = ({ isOpen, onClose, foodItem, onSave }) => {
  const [editedItem, setEditedItem] = useState(foodItem || {});
  const [selectedImage, setSelectedImage] = useState(null); // Store new image
  const [imagePreview, setImagePreview] = useState(null); // For previewing the image
  const [isSaving, setIsSaving] = useState(false); // Define the isSaving state

  useEffect(() => {
    if (foodItem) {
      setEditedItem(foodItem);
    }
  }, [foodItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Merged handleImageChange function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // For previewing the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file); // Load image as base64
    }
  };

  const handleSave = async () => {
    if (!editedItem || !editedItem.name) {
      alert("Please fill out all fields.");
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

      const accessToken = localStorage.getItem("accessToken");
      const response = await updateMenuItem(foodItem._id, formData, accessToken);

      if (response.success) {
        onSave(response.data);
        onClose();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
    setIsSaving(false); // End saving
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
      <Box className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-5">
        <Typography id="modal-title" variant="h6" className="font-bold">
          Edit Food Item
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
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          name="category"
          value={editedItem.category || ""}
          onChange={handleChange}
        />

        {/* Image Upload Section */}
        <div className="mt-6">
          <Typography variant="body1" className="mb-3 font-semibold text-gray-800">
            Upload or Update Image:
          </Typography>

          {/* File input container */}
          <div className="flex flex-col items-start space-y-2">
            {/* Label for the file upload button */}
            <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
              {/* Button-like label with clear instructions */}
              <Typography variant="body1" className="bg-blue-100 hover:bg-blue-200 rounded-md py-2 px-5 text-center font-semibold">
                Click here to choose an image
              </Typography>
            </label>
            <Typography variant="body2" className="text-gray-500 text-center">
              (Select an image file from your computer)
            </Typography>

            {/* Hidden input field for file upload */}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" // Hide the default file input
            />

            {/* Image Preview Section */}
            {imagePreview && (
              <div className="mt-4 text-center">
                <Typography variant="body2" color="textSecondary" className="mb-2">
                  <strong>Image Preview:</strong>
                </Typography>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300 mx-auto"
                />
              </div>
            )}

            {/* Display file name of the selected image */}
            {selectedImage && !imagePreview && (
              <Typography variant="body2" color="textSecondary" className="mt-3 text-center">
                <strong>Selected File:</strong> {selectedImage.name}
              </Typography>
            )}
          </div>
        </div>




        <div className="mt-4 flex justify-between">
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditMenuItem;
