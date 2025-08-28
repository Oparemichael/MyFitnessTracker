import React, { useEffect, useState } from "react";

export default function ProfilePage() {
  const [savedExercises, setSavedExercises] = useState([]);
  const [user, setUser] = useState(null);

  // Load saved exercises and user from localStorage on mount
  useEffect(() => {
    const storedExercises = localStorage.getItem("savedExercises");
    if (storedExercises) {
      setSavedExercises(JSON.parse(storedExercises));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Remove an exercise from profile
  const removeExercise = (id) => {
    const updated = savedExercises.filter((ex) => ex.id !== id);
    setSavedExercises(updated);
    localStorage.setItem("savedExercises", JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* User Info */}
      <div className="bg-white w-screen shadow-md rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        {user ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                {user?.firstName 
                ? `Welcome, ${user.firstName}! 🎉` 
                : 'Welcome to your Dashboard 🎉'}
            </h1>
            <p className="text-gray-500 text-sm">Email: {user.email}</p>
          </>
        ) : (
          <p className="text-gray-600">No user data found. Please log in.</p>
        )}
      </div>

      {/* Saved Exercises */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Saved Exercises</h2>

        {savedExercises.length === 0 ? (
          <p className="text-gray-500">
            No saved exercises yet. Go explore and save some!
          </p>
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
                  onClick={() => removeExercise(ex.id)}
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
