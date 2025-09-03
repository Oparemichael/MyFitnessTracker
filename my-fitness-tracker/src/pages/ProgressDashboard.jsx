import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function ProgressDashboard() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(stored);
  }, []);

  if (workouts.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Progress Dashboard</h1>
        <p className="text-gray-500">No workouts logged yet.</p>
      </div>
    );
  }

  // ✅ Calculate summary stats
  const totalWorkouts = workouts.length;
  const lastWorkout = workouts[workouts.length - 1].date;
  const totalWeight = workouts.reduce((sum, w) => {
    return (
      sum +
      (w.exercises || []).reduce(
        (s, ex) => s + (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0),
        0
      )
    );
  }, 0);

  // ✅ Format data for charts
  const weightOverTime = workouts.map((w) => ({
    date: w.date,
    total: (w.exercises || []).reduce(
      (s, ex) => s + (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0),
      0
    ),
  }));

  const workoutsPerCategory = workouts.reduce((acc, w) => {
    acc[w.category] = (acc[w.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.keys(workoutsPerCategory).map((cat) => ({
    category: cat,
    count: workoutsPerCategory[cat],
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Progress Dashboard</h1>

      {/* ✅ Quick Stats */}
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
          <h2 className="text-lg font-semibold">Total Weight Lifted</h2>
          <p className="text-2xl font-bold">{totalWeight} kg</p>
        </div>
      </div>

      {/* ✅ Chart: Weight over time */}
      <div className="p-4 bg-white shadow rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">Weight Lifted Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Chart: Workouts per category */}
      <div className="p-4 bg-white shadow rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Workouts by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
