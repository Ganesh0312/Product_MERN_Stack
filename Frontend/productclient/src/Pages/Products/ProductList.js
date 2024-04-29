import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import { FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/product/get-product"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/product/delete-product/${productToDelete}`
      );
      setProducts(
        products.filter((product) => product._id !== productToDelete)
      );
      setShowDeleteConfirmation(false);
      setProductToDelete(null);
    } catch (error) {
      toast.error("Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:border-indigo-500 placeholder-gray-400"
                placeholder="Search products"
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
                to="/add-product"
                className="bg-pink-800 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded ml-4"
              >
                Add Product
              </Link>
            </div>
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-yellow-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pack Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  MRP
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products
                .filter((product) =>
                  product.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.productName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.packSize}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.MRP}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.status}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {product.category}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="h-16 w-auto object-contain"
                      />
                    </td>
                    <td className="px-4 py-2 flex whitespace-nowrap">
                      <FaEdit
                        className="text-blue-500 cursor-pointer mr-2"
                        onClick={() => {}}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setShowDeleteConfirmation(true);
                          setProductToDelete(product._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Layout>

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <div className=" items-center ">
              <p>Are you sure you want to delete this product?</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
