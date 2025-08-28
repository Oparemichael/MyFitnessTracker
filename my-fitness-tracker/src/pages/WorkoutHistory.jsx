// src/pages/WorkoutHistory.jsx
import { useEffect, useState } from "react";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("workouts")) || [];
    // Sort workouts by date (newest first)
    const sorted = stored.sort((a, b) => new Date(b.date) - new Date(a.date));
    setWorkouts(sorted);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Workout History</h1>

        {workouts.length === 0 ? (
          <p className="text-gray-500">No workouts logged yet. Start logging your workouts!</p>
        ) : (
          <div className="space-y-6">
            {workouts.map((workout, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                {/* Workout Date */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {new Date(workout.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>

                {/* Exercises */}
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  {workout.exercises?.map((ex, i) => (
                    <li key={i}>
                      <span className="font-semibold">{ex.name}</span> – {ex.sets} sets × {ex.reps} reps @ {ex.weight}kg
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutHistory;
