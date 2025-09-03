import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WorkoutLog() {
  const navigate = useNavigate();

  const [todayWorkout, setTodayWorkout] = useState(null);

  // Load today's workout safely
  useEffect(() => {
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem("workouts")) || [];
    } catch (err) {
      console.error("Failed to parse workouts from localStorage", err);
    }

    const today = new Date().toISOString().split("T")[0];
    const found = stored.find((w) => w.date === today);

    if (found) {
      setTodayWorkout(found);
    } else {
      setTodayWorkout({
        id: Date.now(),
        date: today,
        category: "custom",
        exercises: [],
      });
    }
  }, []);

  // Handle input change for sets/reps/weight
  const handleChange = (exIndex, field, value) => {
    if (!todayWorkout) return;
    const updated = { ...todayWorkout };
    updated.exercises[exIndex][field] = Number(value) || 0;
    setTodayWorkout(updated);
  };

  // Save updated workout
  const saveWorkout = () => {
    if (!todayWorkout) return;
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem("workouts")) || [];
    } catch {
      stored = [];
    }

    const index = stored.findIndex((w) => w.date === todayWorkout.date);
    if (index >= 0) stored[index] = todayWorkout;
    else stored.push(todayWorkout);

    localStorage.setItem("workouts", JSON.stringify(stored));
    alert("Workout saved!");
  };

  // Delete workout for today
  const deleteWorkout = () => {
    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem("workouts")) || [];
    } catch {
      stored = [];
    }

    // remove today's workout
    stored = stored.filter((w) => w.date !== todayWorkout.date);
    localStorage.setItem("workouts", JSON.stringify(stored));

    setTodayWorkout(null);
    alert("Workout deleted!");
  };

  const startWorkout = () => {
    navigate("/workout-session");
  };

  if (!todayWorkout) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Workout Log</h1>
      <p className="mb-4 text-gray-600">Date: {todayWorkout.date}</p>

      {todayWorkout.exercises.length === 0 ? (
        <p className="text-gray-500">
          No exercises yet. Add some from the Exercise Explorer.
        </p>
      ) : (
        <div className="space-y-4">
          {todayWorkout.exercises.map((ex, index) => (
            <div
              key={ex.id || index}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="font-semibold text-lg">{ex.name}</h3>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <label className="block text-sm">Sets</label>
                  <input
                    type="number"
                    value={ex.sets || ""}
                    min="1"
                    onChange={(e) =>
                      handleChange(index, "sets", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">Reps</label>
                  <input
                    type="number"
                    value={ex.reps || ""}
                    min="1"
                    onChange={(e) =>
                      handleChange(index, "reps", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm">Weight (kg)</label>
                  <input
                    type="number"
                    value={ex.weight || ""}
                    min="0"
                    onChange={(e) =>
                      handleChange(index, "weight", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex space-x-4 mt-6">
        <button
          onClick={saveWorkout}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Workout
        </button>

        {todayWorkout.exercises.length > 0 && (
          <button
            onClick={startWorkout}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Start Workout
          </button>
        )}

        <button
          onClick={deleteWorkout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete Workout
        </button>
      </div>
    </div>
  );
}
