import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constant";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/forgotpassword`, { email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-base-300 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-gray-500 text-center mb-4">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
