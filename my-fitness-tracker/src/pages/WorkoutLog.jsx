import { useState, useEffect } from "react";
import { fetchExercisesByMuscle } from "../services/fitnessApi";

const WorkoutLog = () => {
  const [exercises, setExercises] = useState([]);
  const [workout, setWorkout] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
  });
  const [workouts, setWorkouts] = useState([]);

  // Load saved workouts from localStorage
  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(savedWorkouts);
  }, []);

  // Save workouts whenever they change
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  // (Optional) fetch a default set of exercises (e.g. chest) to populate dropdown
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const data = await fetchExercisesByMuscle(1); // 1 = chest as example
        setExercises(data.results || []);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    };
    loadExercises();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  // Save workout entry
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!workout.exercise || !workout.sets || !workout.reps) {
      alert("Please fill in exercise, sets, and reps.");
      return;
    }

    const newWorkout = {
      ...workout,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    setWorkouts([newWorkout, ...workouts]);
    setWorkout({ exercise: "", sets: "", reps: "", weight: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Log Workout</h1>

        {/* Workout Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exercise
            </label>
            <select
              name="exercise"
              value={workout.exercise}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select exercise...</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.name}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sets
              </label>
              <input
                type="number"
                name="sets"
                value={workout.sets}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reps
              </label>
              <input
                type="number"
                name="reps"
                value={workout.reps}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={workout.weight}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Workout
          </button>
        </form>

        {/* Workout History Preview */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Workouts</h2>
          {workouts.length === 0 ? (
            <p className="text-gray-500">No workouts logged yet.</p>
          ) : (
            <ul className="space-y-3">
              {workouts.map((w) => (
                <li
                  key={w.id}
                  className="bg-white p-4 rounded-lg shadow flex justify-between"
                >
                  <div>
                    <p className="font-medium">{w.exercise}</p>
                    <p className="text-sm text-gray-600">
                      {w.sets} sets × {w.reps} reps @ {w.weight || 0} kg
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(w.timestamp).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutLog;
