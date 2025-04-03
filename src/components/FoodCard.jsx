import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditFoodModal from "./EditFoodModal";
import { deleteMenuItem } from "../services/api";
import { toast } from "react-toastify";

const FoodCard = ({ item, onEdit, onDelete, token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) {
      console.error("onDelete function is not defined.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setIsDeleting(true);
    try {
      await deleteMenuItem(item._id, token);
      onDelete(item._id); // ✅ Remove item from UI
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 border border-gray-200 hover:shadow-lg transition duration-300">
      <img
        src={item.foodImage || "https://via.placeholder.com/150"}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
      <div className="flex justify-between items-center my-2">
        <p className="text-lg font-bold text-green-700">₹{item.price}</p>
        <span
          className={`text-xs px-2 py-1 rounded-full ${item.inStock ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
        >
          {item.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <p className="text-xs text-gray-500">
        <strong>Category:</strong> {item.category}
      </p>

      <div className="flex justify-between mt-3">
        <Button
          onClick={() => setIsModalOpen(true)}
          startIcon={<EditIcon />}
          variant="contained"
          disableElevation
          className="!bg-blue-500 !text-white !py-1.5 !rounded-lg transition hover:!bg-blue-700"
        >
          Edit
        </Button>


        <IconButton onClick={handleDelete} disabled={isDeleting} className="text-red-600 hover:text-red-800">
          <DeleteIcon />
        </IconButton>
      </div>

      {isModalOpen && (
        <EditFoodModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          foodItem={item}
          onSave={(updatedItem) => {
            onEdit(updatedItem); // ✅ Update the state in parent component
            setIsModalOpen(false); // Close modal after saving
          }}
        />
      )}
    </div>
  );
};

export default FoodCard;
