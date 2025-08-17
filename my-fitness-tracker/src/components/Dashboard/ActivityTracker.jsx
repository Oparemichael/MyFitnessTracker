import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const ActivityTracker = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Steps',
      data: [5000, 7000, 8500, 6500, 9000, 12000, 8000],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
    }]
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Activity Tracker</h2>
      <div className="h-64">
        <Chart type="bar" data={data} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-sm text-gray-500">Today's Steps</p>
          <p className="text-2xl font-bold">8,542</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Distance</p>
          <p className="text-2xl font-bold">5.2 km</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Calories</p>
          <p className="text-2xl font-bold">1,250</p>
        </div>
      </div>
    </section>
  );
};

export default ActivityTracker;