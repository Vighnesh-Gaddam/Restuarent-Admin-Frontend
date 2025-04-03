/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditFoodModal from './EditFoodModal'; // Import the EditFoodModal

// const CategoryNavbar = ({ categories, selectedCategory, onCategoryChange, onSearchChange }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

//   const handleAddItem = () => {
//     setIsModalOpen(true); // Open modal when "Add Item" is clicked
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close modal
//   };

//   const handleSaveItem = (newItem) => {
//     // Logic to save the new item (could be an API call or state update)
//     console.log('New Item Saved:', newItem);
//     setIsModalOpen(false); // Close modal after saving
//   };

//   return (
//     <div className="flex items-center justify-between p-4 border-b-2 shadow-xl mb-4 bg-gray-100 ">
//       {/* Category Buttons */}
//       <div className="flex items-center space-x-4 overflow-auto mx-3">
//         {categories.map((category) => (
//           <Button
//             key={category}
//             variant={selectedCategory === category ? "contained" : "text"}
//             color="primary"
//             onClick={() => onCategoryChange(category)}
//             className={`px-6 py-2 font-semibold rounded-full transition-all ${
//               selectedCategory === category ? "bg-white shadow" : "text-gray-500"
//             }`}
//           >
//             {category}
//           </Button>
//         ))}
//       </div>

//       {/* Search & Add Item Button in One Row */}
//       <div className="flex items-center space-x-4">

//         {/* Add Item Button */}
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleAddItem}
//           className="rounded-lg"
//           sx={{
//             padding: "8px 16px",
//             fontSize: "16px",
//             textTransform: "none",
//           }}
//         >
//           Add Item
//         </Button>
//       </div>

//       {/* EditFoodModal (Add Item Modal) */}
//       <EditFoodModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         foodItem={{}} // Empty food item for new item
//         onSave={handleSaveItem}
//       />
//     </div>
//   );
// };

// export default CategoryNavbar;


const CategoryNavbar = ({ categories, selectedCategory, onCategoryChange, onSearchChange, onAddItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItem = () => {
    setIsModalOpen(true); // Open modal when "Add Item" is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleSaveItem = (newItem) => {
    console.log('New Item Saved:', newItem);
    onAddItem(newItem); // Add the new item to the menu state in the parent component
    setIsModalOpen(false); // Close modal after saving
  };

  return (
    <div className="flex items-center justify-between p-4 border-b-2 shadow-xl mb-4 bg-gray-100">
      <div className="flex items-center space-x-4 overflow-auto mx-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "text"}
            color="primary"
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 font-semibold rounded-full transition-all ${selectedCategory === category ? "bg-white shadow" : "text-gray-500"
              }`}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="contained"
          onClick={handleAddItem}
          className="rounded-lg text-white font-semibold"
          sx={{
            background: "linear-gradient(135deg, #007BFF, #00C6FF)", // Deep blue to sky blue
            padding: "8px 16px",
            fontSize: "16px",
            textTransform: "none",
            "&:hover": { background: "linear-gradient(135deg, #0056b3, #0095cc)" }, // Slightly darker on hover
          }}
        >
          Add Item
        </Button>
      </div>

      <EditFoodModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        foodItem={{}} // Empty food item for new item
        onSave={handleSaveItem}
      />
    </div>
  );
};

export default CategoryNavbar;
