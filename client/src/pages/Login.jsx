import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom"; // For the custom alert/message box

// Component for a custom message box (instead of alert())
const MessageBox = ({ message, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          OK
        </button>
      </div>
    </div>,
    document.body
  );
};

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null); // State for custom message box
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      setMessage("Login successful!"); // Set success message
      localStorage.setItem("token", res.data.token);
      // Navigate to dashboard after a short delay to allow message to be seen
      setTimeout(() => {
        setMessage(null); // Clear message
        navigate("/home"); // Create dashboard later
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed"); // Set error message
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Section: Sign In to  Account Form */}
      <div className="flex flex-col items-center justify-center flex-1 bg-white p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <h2 className="text-4xl font-bold text-[#e67e22] text-center mb-6">
            Sign In to Your Account
          </h2>

          {/* Email Input */}
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 placeholder-gray-500 text-lg"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 placeholder-gray-500 text-lg"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a href="#" className="text-gray-500 hover:underline text-sm">
              forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#e67e22] text-white p-3 rounded-full text-xl font-semibold hover:bg-[#d35400] transition duration-300 shadow-md"
          >
            SIGN IN
          </button>
        </form>
      </div>

      {/* Right Section*/}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-[#2c3e50] text-white p-8 relative overflow-hidden rounded-l-3xl">
        <div className="absolute top-10 right-10 w-24 h-24 bg-white bg-opacity-10 rounded-full transform rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full transform -rotate-30"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-md transform rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-md transform -rotate-24"></div>

        <h2 className="text-5xl font-bold mb-4 text-center z-10">
          Hello Friend!
        </h2>
        <p className="text-lg text-center mb-8 max-w-sm z-10">
          Enter your personal details and start your journey with us
        </p>
        <button
          onClick={() => navigate("/signup")} // Navigate to signup page
          className="px-10 py-3 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-[#2c3e50] transition duration-300 z-10"
        >
          SIGN UP
        </button>
      </div>

      {/* Custom Message Box */}
      {message && (
        <MessageBox message={message} onClose={() => setMessage(null)} />
      )}
    </div>
  );
};

export default Login;
