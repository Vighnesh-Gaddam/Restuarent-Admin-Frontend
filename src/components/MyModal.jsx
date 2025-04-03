import { Modal, Box, Typography, Button } from "@mui/material";

const MyModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
      >
        <Typography id="modal-title" variant="h6" className="font-bold">
          STAY TUNED
        </Typography>
        <Typography className="text-gray-600 my-4">
          Subscribe to our newsletter and never miss our designs, latest news,
          etc. Our newsletter is sent once a week, every Monday.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleClose}
        >
          Accept It
        </Button>
      </Box>
    </Modal>
  );
};

export default MyModal;
