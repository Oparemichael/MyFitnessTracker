import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ProgressPage() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!user) return;

    let stored = [];
    try {
      stored = JSON.parse(localStorage.getItem("workouts")) || [];
    } catch {
      stored = [];
    }

    // Filter workouts for this user
    const userWorkouts = stored.filter((w) => w.userEmail === user.email);

    setWorkouts(userWorkouts);

    // Prepare chart data (total weight per day)
    const data = userWorkouts.map((w) => {
      const totalWeight = w.exercises?.reduce(
        (sum, ex) => sum + (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0),
        0
      );
      return { date: w.date, totalWeight };
    });

    setChartData(data);
  }, [user]);

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Progress Tracker</h1>
        <p className="text-gray-500">Please log in to view your progress.</p>
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Progress Tracker</h1>
        <p className="text-gray-500">No workouts logged yet.</p>
      </div>
    );
  }

  const totalWorkouts = workouts.length;
  const totalWeightLifted = workouts.reduce((sum, w) => {
    const workoutTotal = w.exercises?.reduce(
      (s, ex) => s + (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0),
      0
    );
    return sum + (workoutTotal || 0);
  }, 0);

  const totalReps = workouts.reduce((sum, w) => {
    const workoutReps = w.exercises?.reduce(
      (s, ex) => s + (ex.sets || 0) * (ex.reps || 0),
      0
    );
    return sum + (workoutReps || 0);
  }, 0);

  const avgRepsPerSet = totalReps / (workouts.reduce((sum, w) => {
    const sets = w.exercises?.reduce((s, ex) => s + (ex.sets || 0), 0);
    return sum + (sets || 0);
  }, 0) || 1);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Progress Tracker</h1>

      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <p>Total Workouts: <strong>{totalWorkouts}</strong></p>
        <p>Total Weight Lifted: <strong>{totalWeightLifted} kg</strong></p>
        <p>Average Reps per Set: <strong>{avgRepsPerSet.toFixed(1)}</strong></p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Weight Progress Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalWeight" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
