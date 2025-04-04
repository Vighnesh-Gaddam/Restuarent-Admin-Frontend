/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import FoodCard from "../../components/FoodCard";
import { getAllMenuItems } from "../../services/api";
import CategoryNavbar from "../../components/CategoryNavbar";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All", "Snacks", "Drinks", "Meals", "Desserts"]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await getAllMenuItems();
        setMenuItems(data.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchMenuItems();
  }, []);

  const filteredMenuItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const handleEdit = (updatedItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
  };

  const handleDelete = (id) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddItem = (newItem) => {
    setMenuItems((prevItems) => [newItem, ...prevItems]);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div>
      <CategoryNavbar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onAddItem={handleAddItem}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mx-12 my-4">
        {filteredMenuItems.map((item) => (
          <FoodCard 
            key={item._id} 
            item={item} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            token={localStorage.getItem("accessToken")} 
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
