import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaListAlt, FaShoppingBag } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <>
      <div className="bg-gray-50 text-white w-64 flex flex-col h-screen">
        <div className="">
          <ul className="flex-grow">
            <li
              className={`p-4 flex items-center ${
                isActive("/home") ? "bg-yellow-200" : ""
              }`}
            >
              <FaHome className="mr-2 text-black text-lg" />
              <Link
                to="/home"
                className={`block text-black ${
                  isActive("/home")
                    ? "text-purple-900"
                    : "hover:text-purple-900"
                }`}
              >
                Home
              </Link>
            </li>
            <li
              className={`p-4 flex items-center ${
                isActive("/category") ? "bg-yellow-200" : ""
              }`}
            >
              <FaListAlt className="mr-2 text-black text-lg" />
              <Link
                to="/category"
                className={`block text-black ${
                  isActive("/category")
                    ? "text-purple-900"
                    : "hover:text-purple-900"
                }`}
              >
                Category
              </Link>
            </li>
            <li
              className={`p-4 flex items-center ${
                isActive("/product") ? "bg-yellow-200" : ""
              }`}
            >
              <FaShoppingBag className="mr-2 text-black text-lg" />
              <Link
                to="/product"
                className={`block text-black ${
                  isActive("/product")
                    ? "text-purple-900"
                    : "hover:text-purple-900"
                }`}
              >
                Product
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
