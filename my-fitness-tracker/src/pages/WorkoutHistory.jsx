import React, { useEffect, useState } from "react";

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = () => {
    const stored = JSON.parse(localStorage.getItem("workouts")) || [];
    // sort by most recent first
    const sorted = stored.sort((a, b) => new Date(b.date) - new Date(a.date));
    setWorkouts(sorted);
  };

  const deleteWorkout = (id) => {
    let stored = JSON.parse(localStorage.getItem("workouts")) || [];
    stored = stored.filter((w) => w.id !== id); // remove by id
    localStorage.setItem("workouts", JSON.stringify(stored));
    setWorkouts(stored);
  };

  if (workouts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Workout History</h1>
        <p className="text-gray-500">No workouts logged yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Workout History</h1>

      <div className="space-y-6">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="p-6 bg-white rounded-xl shadow-md border"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                {workout.date}{" "}
                <span className="text-gray-500 text-sm">
                  ({workout.category})
                </span>
              </h2>
              <button
                onClick={() => deleteWorkout(workout.id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {workout.exercises && workout.exercises.length > 0 ? (
              <ul className="space-y-2">
                {workout.exercises.map((ex, index) => (
                  <li
                    key={index}
                    className="p-3 border rounded-md bg-gray-50 text-sm flex justify-between"
                  >
                    <span className="font-medium">{ex.name}</span>
                    <span>
                      {ex.sets || 0} x {ex.reps || 0} @ {ex.weight || 0}kg
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No exercises logged.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
