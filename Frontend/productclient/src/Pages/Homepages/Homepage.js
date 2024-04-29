import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import assest from "../../Assets/Assests";
import Layout from "../../Components/Layout";

const Homepage = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col justify-center items-center h-screen w-full">
          <div className="mb-8 text-center">
            <img
              src={assest.logo}
              alt="DigitalFlake Logo"
              className="h-20 w-200 mb-2 mx-auto"
            />
            <h1 className="text-6xl">
              <span className="text-bold">Digital</span>Flake
            </h1>
            <h1 className="text-3xl">Welcome to Digital Flake Admin</h1>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
