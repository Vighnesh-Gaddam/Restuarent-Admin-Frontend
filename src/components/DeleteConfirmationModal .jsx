import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="delete-modal-title">
      <Box
        className="bg-white p-6 rounded-lg shadow-lg text-center w-96 mx-auto mt-40"
      >
        <Typography id="delete-modal-title" variant="h6" className="mb-4">
          Confirm Deletion
        </Typography>
        <Typography className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be undone.
        </Typography>
        <div className="flex justify-center space-x-4">
          <Button variant="contained" color="error" onClick={onConfirm}>
            Yes, Delete
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
