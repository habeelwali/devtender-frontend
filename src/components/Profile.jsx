import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../utils/userSlice";

const ProfilePage = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [uploading, setUploading] = useState(false);
  if (!userData) return <p>Loading profile...</p>;

  // Open modal and set form data
  const openEditModal = () => {
    setFormData(userData);
    setIsEditing(true);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Compare original data and send only updated fields
  const handleUpdate = async () => {
    const updatedFields = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== userData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    // Prevent sending empty updates
    if (Object.keys(updatedFields).length === 0) {
      toast.error("No changes detected!");
      return;
    }

    try {
     const response =  await axios.patch(`${BASE_URL}/profile/edit`, updatedFields, {
        withCredentials: true,
      });

      dispatch(updateUser(response?.data?.data));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const patchUser =async()=>{
    try {
      const getProfile= await axios.get(`${BASE_URL}/profile`,{
        withCredentials:true
      })
      dispatch(updateUser(getProfile.data.data));
      
    } catch (error) {
      
      
    }
  
  }
  // useEffect(() => {
  //   patchUser();
  // }, [])

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // Key should match backend

    try {
      setUploading(true);
      const response = await axios.patch(`${BASE_URL}/profile/image`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });


      patchUser();// Update Redux state
      toast.success("Profile image updated!");
    } catch (error) {
      toast.error("Failed to update profile image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Profile Info */}
      <div className="bg-base-100 border border-gray-500 shadow-lg p-6 rounded-lg w-96 text-center">
      <div className="relative">
        <img
          src={userData?.photoUrl?.imageUrl || "https://via.placeholder.com/100"}
          alt="Profile"
          className="size-24 rounded-full mx-auto border-2 border-gray-300"
        />

        {/* Edit Icon */}
        <label className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          <span className="text-white text-sm">📷</span>
        </label>
      </div>
        <h2 className="text-xl font-semibold mt-2">{userData.firstname} {userData.lastname}</h2>
        <p className="text-gray-300">{userData.email}</p>
        <p className="text-gray-400">{userData.phone}</p>
        <p className="text-gray-300 capitalize">{userData.gender}</p>
        <p className="text-gray-300">Skills: {userData.skills?.join(", ")}</p>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={openEditModal}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-base-100 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold">Edit Profile</h2>

            <label className="block mt-2">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <label className="block mt-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-base-100"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label className="block mt-2">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills.join(", ")}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value.split(", ") })
              }
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
