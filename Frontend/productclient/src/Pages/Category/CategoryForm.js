import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../Components/Layout";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/category/add-category",
        {
          name,
          description,
          status,
        }
      );
      console.log("Category added successfully:", response.data);
      toast.success("Category added successfully");
      setName("");
      setDescription("");
      setStatus("active");
    } catch (error) {
      toast.error("Error adding category");
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add Category</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="name"
                  autoComplete="off"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Name
                </label>
              </div>
              <div className="relative rounded-md shadow-sm">
                <textarea
                  id="description"
                  autoComplete="off"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                ></textarea>
                <label
                  htmlFor="description"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Description
                </label>
              </div>
              <div className="relative rounded-md shadow-sm">
                <select
                  id="status"
                  autoComplete="off"
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <label
                  htmlFor="status"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Status
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center bg-pink-900 justify-center px-4 py-2 border  border-transparent text-base font-medium rounded-md text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default CategoryForm;
