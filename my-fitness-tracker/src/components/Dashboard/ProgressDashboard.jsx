import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useProgressData } from "../../hooks/useProgressData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressDashboard = () => {
  const { workouts, totalWorkouts, lastWorkout, totalWeight } = useProgressData();

  const last7 = workouts.slice(-7);
  const labels = last7.map(w => new Date(w.date).toLocaleDateString());
  const weightData = last7.map(w =>
    w.exercises.reduce(
      (sum, ex) => sum + (ex.weight || 0) * (ex.reps || 0) * (ex.sets || 1),
      0
    )
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Weight Lifted",
        data: weightData,
        backgroundColor: "rgba(59,130,246,0.6)",
      },
    ],
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Progress Overview
      </h2>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div>
          <p className="text-sm text-gray-500">Total Workouts</p>
          <p className="text-2xl font-bold">{totalWorkouts}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Workout</p>
          <p className="text-2xl font-bold">{lastWorkout}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Weight</p>
          <p className="text-2xl font-bold">{totalWeight} kg</p>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="h-64">
        {workouts.length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p className="text-gray-500 text-center mt-20">
            No workout data yet. Log some workouts to see progress!
          </p>
        )}
      </div>
    </section>
  );
};

export default ProgressDashboard;
