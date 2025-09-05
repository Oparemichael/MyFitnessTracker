// src/pages/SettingsPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SettingsPage() {
  const { user, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    height: user?.height || "",
    weight: user?.weight || "",
    profilePic: user?.profilePic || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setFormData({ ...formData, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Save changes
  const handleSave = () => {
    // Update both user and users list in localStorage
    localStorage.setItem("user", JSON.stringify(formData));
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.email === user.email ? formData : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Account updated successfully!");
    navigate("/profile"); // redirect back to profile
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      {/* Edit Form */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Edit Account Details</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border rounded-lg p-2"
          />
        </div>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-lg p-2 mb-4"
        />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height (cm)"
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            className="border rounded-lg p-2"
          />
        </div>

        {/* Profile Picture */}
        <div className="mb-4 flex items-center space-x-4">
          <img
            src={
              formData.profilePic ||
              "https://via.placeholder.com/100?text=Profile"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <label className="cursor-pointer text-blue-600 text-sm">
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePicUpload}
            />
          </label>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      {/* Delete Account */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <p className="m-auto mb-2">
            Please becareful when using the button below. this action is irreversible
        </p>
        <button
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete your account? This cannot be undone."
              )
            ) {
              deleteAccount();
              navigate("/");
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
