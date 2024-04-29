import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../Components/Layout";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    packSize: "",
    MRP: "",
    status: "active",
    categoryId: "",
    image: "",
  });
  const [categories, setCategories] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/product/add-product", formData);
      toast.success("Product added successfully");
      setFormData({
        productName: "",
        packSize: "",
        MRP: "",
        status: "active",
        categoryId: "",
        image: "",
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data || "Error adding product");
      } else if (error.request) {
        toast.error("No response received from server");
      } else {
        toast.error("Error adding product");
      }
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative ">
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text- text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                  required
                />
                <label
                  htmlFor="productName"
                  className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Product Name
                </label>
              </div>
              <div className=" relative ">
                <label
                  htmlFor="packSize"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Pack Size
                </label>
                <input
                  type="text"
                  id="packSize"
                  name="packSize"
                  value={formData.packSize}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text- text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div className=" relative ">
                <label
                  htmlFor="MRP"
                  className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  MRP
                </label>
                <input
                  type="number"
                  id="MRP"
                  name="MRP"
                  value={formData.MRP}
                  onChange={handleChange}
                  step="0.01"
                  className="block px-2.5 pb-2.5 pt-4 w-full text- text-black bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="status"
                  className="absolute text-lg text-black  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text- text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="relative">
                <label
                  htmlFor="categoryId"
                  className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text- text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <label
                  htmlFor="image"
                  className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text- text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-blue-600"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className=" bg-pink-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Product
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </Layout>
    </>
  );
};

export default ProductForm;
