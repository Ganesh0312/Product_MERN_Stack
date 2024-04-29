import React from "react";
import { useNavigate } from "react-router-dom";
import assest from "../Assets/Assests";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className=" bg-pink-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={assest.logo} alt="Digitalflake Logo" className="h-8 mr-2" />
        <span className="text-white text-lg font-bold">Digitalflake</span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
