import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import { FaTimes, FaTrash, FaEdit } from "react-icons/fa";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/category/get-category"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/category/delete-category/${categoryToDelete}`
      );
      // Remove the deleted category from the state
      setCategories(
        categories.filter((category) => category._id !== categoryToDelete)
      );
      // Close the confirmation popup
      setShowDeleteConfirmation(false);
      // Reset the category to delete
      setCategoryToDelete(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Categories</h1>
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:border-indigo-500 placeholder-gray-400"
                placeholder="Search categories"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-0 top-0 mt-2 mr-4"
                  onClick={() => setSearchTerm("")}
                >
                  <FaTimes className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>
            <div className="flex items-center">
              <Link
                to="/add-category"
                className="bg-pink-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded ml-4 inline-block"
              >
                Add Category
              </Link>
            </div>
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-yellow-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories
                .filter((category) =>
                  category.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex">
                      <FaEdit
                        className="text-blue-500 cursor-pointer mr-2"
                        onClick={() => {}}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setShowDeleteConfirmation(true);
                          setCategoryToDelete(category._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Layout>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Are you sure you want to delete this category?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleDeleteCategory}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
