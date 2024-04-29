import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-2 border ">
          <div className="border border-gray-300 h-full p-4 shadow-md">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
