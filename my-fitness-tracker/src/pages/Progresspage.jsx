// src/pages/ProgressPage.jsx
import { useEffect, useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  LineElement, PointElement
);

const ProgressPage = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('workouts')) || [];
    setWorkouts(stored);
  }, []);

  // --- Aggregate Data ---
  const totalsByDate = workouts.reduce((acc, workout) => {
    const date = new Date(workout.date).toLocaleDateString();
    if (!acc[date]) acc[date] = { weight: 0, reps: 0, count: 0 };
    workout.exercises.forEach(ex => {
      acc[date].weight += (ex.weight || 0) * (ex.reps || 0) * (ex.sets || 1);
      acc[date].reps += (ex.reps || 0) * (ex.sets || 1);
    });
    acc[date].count += 1;
    return acc;
  }, {});

  const labels = Object.keys(totalsByDate);
  const weightData = labels.map(d => totalsByDate[d].weight);
  const repsData = labels.map(d => totalsByDate[d].reps);

  // --- Chart Data ---
  const weightChartData = {
    labels,
    datasets: [
      {
        label: 'Total Weight Lifted',
        data: weightData,
        backgroundColor: 'rgba(59,130,246,0.6)',
      },
    ],
  };

  const repsChartData = {
    labels,
    datasets: [
      {
        label: 'Total Reps',
        data: repsData,
        borderColor: 'rgba(16,185,129,1)',
        backgroundColor: 'rgba(16,185,129,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Progress Tracking</h1>

      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts logged yet. Start logging to see your progress!</p>
      ) : (
        <div className="space-y-10">
          {/* Weight Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Weight Lifted Over Time</h2>
            <Bar data={weightChartData} />
          </div>

          {/* Reps Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Total Reps Over Time</h2>
            <Line data={repsChartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
