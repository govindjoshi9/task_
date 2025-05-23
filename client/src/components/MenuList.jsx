import { useState, useEffect } from "react";
import axios from "axios";
import MenuForm from "./MenuForm";

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? "$0.00" : `$${num.toFixed(2)}`;
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/menu-items",
          {
            params: { search: searchTerm },
          }
        );
        setMenuItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMenuItems();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleAddItem = (newItem) => {
    setMenuItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/menu-items/${id}`
      );

      if (response.status === 200) {
        setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success("Menu item deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error(error.response?.data?.error || "Failed to delete menu item");
    }
  };

  
  const confirmDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      handleDeleteItem(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading menu items...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MenuForm onAddItem={handleAddItem} />
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Menu Items</h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {menuItems.length === 0 ? (
              <p className="text-gray-500">No menu items found.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {menuItems.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-medium">
                          {formatPrice(item.price)}
                        </span>
                        <button
                          onClick={() => confirmDelete(item.id, item.title)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                          title="Delete item"
                          aria-label="Delete menu item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
