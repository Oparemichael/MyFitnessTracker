import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(stored);
  }, []);

  const totalWorkouts = workouts.length;
  const lastWorkout = totalWorkouts > 0 ? workouts[workouts.length - 1].date : "N/A";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Fitness Dashboard</h1>

      {/* ✅ Quick summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Workouts</h2>
          <p className="text-2xl font-bold">{totalWorkouts}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-lg font-semibold">Last Workout</h2>
          <p className="text-xl">{lastWorkout}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg text-center">
          <h2 className="text-lg font-semibold">Next Goal</h2>
          <p className="text-gray-600">Stay consistent! 💪</p>
        </div>
      </div>

      {/* ✅ Feature navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/log"
          className="p-6 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Workout Log</h2>
          <p>Start Excersing now <br/>Log today’s exercises, sets, reps, and weights.</p>
        </Link>

        <Link
          to="/history"
          className="p-6 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Workout History</h2>
          <p>Review all past workouts and track your progress.</p>
        </Link>

        <Link
          to="/progress"
          className="p-6 bg-purple-500 text-white rounded-xl shadow hover:bg-purple-600 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Progress Dashboard</h2>
          <p>View charts and statistics of your fitness journey.</p>
        </Link>

        <Link
          to="/exercises"
          className="p-6 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Explore Workouts</h2>
          <p>Search and discover new exercises to try out.<br/>Click 'add to workout' to add it your selected workouts</p>
        </Link>
      </div>
    </div>
  );
}
