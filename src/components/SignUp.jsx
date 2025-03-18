import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        firstname,
        lastname,
        email,
        password,
      });

      dispatch(loginUser(response.data.data));
      toast.success(response.data.message);
      navigate("/login");
      console.log("Signup successful:", response.data);

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div  className="bg-base-300 rounded-md ">

      
      <form
        onSubmit={handleSubmit}
        className="bg-base-300 p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-300">First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <div className="px-6 pb-6 ">
        <p className="text-gray-300">Don't have an account? <Link className="text-blue-400" to="/login">Login</Link></p>
      </div>
      </div>
    </div>
  );
};

export default SignUp;
