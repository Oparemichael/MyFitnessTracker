import React, { useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineController, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale,
  BarElement,
  Tooltip,
  Legend 
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend
);

const ProgressDashboard = () => {
  // Time period selection
  const [timePeriod, setTimePeriod] = useState('week');
  
  // Sample progress data (replace with real data from your backend)
  const progressData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      steps: [4500, 7000, 8500, 6000, 9500, 12000, 8000],
      calories: [1200, 1500, 1800, 1400, 2000, 2500, 1700],
      workouts: [1, 0, 1, 1, 0, 1, 1]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      steps: [32000, 35000, 38000, 42000],
      calories: [8000, 8500, 9000, 9500],
      workouts: [3, 4, 5, 4]
    }
  };

  // Current data based on selected time period
  const currentData = progressData[timePeriod];

  // Combined chart data
  const chartData = {
    labels: currentData.labels,
    datasets: [
      {
        type: 'line',
        label: 'Steps',
        data: currentData.steps,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        yAxisID: 'y'
      },
      {
        type: 'bar',
        label: 'Calories Burned',
        data: currentData.calories,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        yAxisID: 'y1'
      },
      {
        type: 'bar',
        label: 'Workouts',
        data: currentData.workouts,
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        yAxisID: 'y2'
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Steps'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Calories'
        }
      },
      y2: {
        type: 'linear',
        display: false,
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.dataset.label === 'Steps') {
              label += context.raw.toLocaleString();
            } else if (context.dataset.label === 'Calories Burned') {
              label += context.raw;
            } else if (context.dataset.label === 'Workouts') {
              label += context.raw + (context.raw === 1 ? ' workout' : ' workouts');
            }
            return label;
          }
        }
      }
    }
  };

  // Summary metrics
  const summary = {
    totalSteps: currentData.steps.reduce((a, b) => a + b, 0),
    avgSteps: Math.round(currentData.steps.reduce((a, b) => a + b, 0) / currentData.steps.length),
    totalCalories: currentData.calories.reduce((a, b) => a + b, 0),
    totalWorkouts: currentData.workouts.reduce((a, b) => a + b, 0)
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow md:col-span-2">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Progress Dashboard</h2>
        <div className="flex space-x-2 mt-3 md:mt-0">
          <button
            onClick={() => setTimePeriod('week')}
            className={`px-3 py-1 text-sm rounded-md ${timePeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimePeriod('month')}
            className={`px-3 py-1 text-sm rounded-md ${timePeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-80 mb-8">
        <Chart 
          type="bar" 
          data={chartData} 
          options={chartOptions} 
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">Total Steps</p>
          <p className="text-2xl font-bold">{summary.totalSteps.toLocaleString()}</p>
          <p className="text-xs text-blue-600 mt-1">
            {summary.avgSteps.toLocaleString()} avg/day
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-800">Calories Burned</p>
          <p className="text-2xl font-bold">{summary.totalCalories}</p>
          <p className="text-xs text-green-600 mt-1">
            {Math.round(summary.totalCalories / currentData.labels.length)} avg/day
          </p>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-sm text-amber-800">Workouts Completed</p>
          <p className="text-2xl font-bold">{summary.totalWorkouts}</p>
          <p className="text-xs text-amber-600 mt-1">
            {timePeriod === 'week' ? 'This week' : 'This month'}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-800">Current Streak</p>
          <p className="text-2xl font-bold">5 days</p>
          <p className="text-xs text-purple-600 mt-1">
            {timePeriod === 'week' ? 'This week' : 'This month'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgressDashboard;