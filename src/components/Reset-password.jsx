import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constant";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both fields.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const payload = {
        restToken:token,
        password: newPassword
    }

    try {
      setLoading(true);
      console.log(payload);
      
      const response = await axios.post(`${BASE_URL}/resetPassword`, payload);
      toast.success(response.data.message);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-base-300 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <p className="text-gray-300 text-center mb-4">
          Enter a new password for your account.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-300">New Password</label>
          <input
            type="password"
             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label className="block mb-2 text-gray-300 mt-4">Confirm Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
