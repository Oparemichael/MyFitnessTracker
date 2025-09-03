import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [savedExercises, setSavedExercises] = useState([]);
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  const navigate =  useNavigate();

  // Load user and exercises from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedExercises = localStorage.getItem("savedExercises");
    if (storedExercises) setSavedExercises(JSON.parse(storedExercises));
  }, []);

  // Save updates to localStorage
  const updateUser = (updated) => {
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  // Handle profile picture upload
  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
        updateUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // BMI Calculation
  const calculateBMI = (height, weight) => {
    if (!height || !weight) return null;
    const h = height / 100; // cm → m
    return (weight / (h * h)).toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (!bmi) return "Unknown";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <div className="p-6 max-w-7x1 mx-auto">
      {/* User Info */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 flex justify-between items-center">
        {/* Left side (editable user info) */}
        <div>
          <h1 className="text-2xl font-bold mb-2">My Profile</h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-semibold">{user.firstname}</span> 👋
          </p>
          <p className="text-gray-500 text-sm">Email: {user?.email}</p>

          {/* Editable Height */}
          <div className="mt-2">
            <label className="text-sm text-gray-600">Height (cm):</label>
            <input
              type="number"
              value={user?.height || ""}
              onChange={(e) => updateUser({ ...user, height: e.target.value })}
              className="ml-2 border rounded-lg p-1 w-24 text-sm"
            />
          </div>

          {/* Editable Weight */}
          <div className="mt-2">
            <label className="text-sm text-gray-600">Weight (kg):</label>
            <input
              type="number"
              value={user?.weight || ""}
              onChange={(e) => updateUser({ ...user, weight: e.target.value })}
              className="ml-2 border rounded-lg p-1 w-24 text-sm"
            />
          </div>

          {/* BMI */}
          <p className="mt-2 text-gray-700 font-semibold">
            BMI: {calculateBMI(user?.height, user?.weight)} (
            {getBMICategory(calculateBMI(user?.height, user?.weight))})
          </p>
        </div>

        {/* Right side (profile picture) */}
        <div className="flex flex-col items-center">
          <img
            src={
              profilePic ||
              user?.profilePic ||
              "https://via.placeholder.com/150?text=Profile+Picture"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border shadow"
          />
          <label className="mt-3 cursor-pointer text-blue-600 text-sm">
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePicUpload}
            />
          </label>
        </div>
      </div>

      {/* Saved Exercises */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Favourites</h2>

        {savedExercises.length === 0 ? (
        <div>
          <p className="text-gray-500">
            No saved exercises yet.
          </p>
          <button
            onClick={() => navigate("/exercises")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            > Explore Workouts</button>
        </div>
        ) : (
          <ul className="space-y-4">
            {savedExercises.map((ex) => (
              <li
                key={ex.id}
                className="p-4 border rounded-xl shadow-sm bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-lg">{ex.name}</h3>
                  <p
                    className="text-gray-600 text-sm mt-1"
                    dangerouslySetInnerHTML={{ __html: ex.description }}
                  />
                </div>
                <button
                  onClick={() => {
                    const updated = savedExercises.filter(
                      (e) => e.id !== ex.id
                    );
                    setSavedExercises(updated);
                    localStorage.setItem(
                      "savedExercises",
                      JSON.stringify(updated)
                    );
                  }}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}