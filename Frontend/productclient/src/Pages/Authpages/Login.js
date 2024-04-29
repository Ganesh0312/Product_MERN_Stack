import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import assest from "../../Assets/Assests";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigat = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/admin/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("Login Successful");
      navigat("/home");
    } catch (error) {
      console.error("Login failed", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center">
              <img
                className="h-12 mx-auto"
                src={assest.logo}
                alt="DigitalFlake Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                DigitalFlake
              </h2>
              <p className="text-gray-600 mt-2">
                Welcome to DigitalFlake Admin
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-purple-900"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Email address
                </label>
              </div>
              <div className="relative rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:border-purple-900"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Password
                </label>
              </div>
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-900 hover:text-indigo-800"
                >
                  Forgot Password?
                </Link>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div>
                <button
                  type="submit"
                  className="group  relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-900 hover:bg-magenta-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
