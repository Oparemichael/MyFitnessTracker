import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const GoalSetting = () => {
  // Default goals
  const defaultGoals = {
    dailySteps: 10000,
    weeklyWorkouts: 5,
    monthlyWeightLoss: 2, // in kg
    waterIntake: 8 // in glasses
  };

  // User goals state
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('fitnessGoals');
    return savedGoals ? JSON.parse(savedGoals) : defaultGoals;
  });

  // Progress data
  const [progress, setProgress] = useState({
    currentSteps: 6542,
    completedWorkouts: 3,
    weightLost: 0.8,
    waterConsumed: 5
  });

  // Handle goal changes
  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoals(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  // Save goals to localStorage when they change
  useEffect(() => {
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));
  }, [goals]);

  // Calculate completion percentages
  const completion = {
    steps: Math.min(100, Math.round((progress.currentSteps / goals.dailySteps) * 100)),
    workouts: Math.min(100, Math.round((progress.completedWorkouts / goals.weeklyWorkouts) * 100)),
    weight: Math.min(100, Math.round((progress.weightLost / goals.monthlyWeightLoss) * 100)),
    water: Math.min(100, Math.round((progress.waterConsumed / goals.waterIntake) * 100))
  };

  // Chart data
  const chartData = {
    labels: ['Steps', 'Workouts', 'Weight', 'Water'],
    datasets: [
      {
        data: [
          completion.steps,
          completion.workouts,
          completion.weight,
          completion.water
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(6, 182, 212, 0.7)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(6, 182, 212, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Goal Settings</h2>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={() => setGoals(defaultGoals)}
        >
          Reset to Defaults
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goal Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Steps Goal
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="dailySteps"
                value={goals.dailySteps}
                onChange={handleGoalChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                min="1000"
                step="500"
              />
              <span className="ml-2 text-gray-500">steps</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weekly Workouts
            </label>
            <input
              type="number"
              name="weeklyWorkouts"
              value={goals.weeklyWorkouts}
              onChange={handleGoalChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              min="1"
              max="14"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Weight Loss
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="monthlyWeightLoss"
                value={goals.monthlyWeightLoss}
                onChange={handleGoalChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                min="0.5"
                step="0.5"
              />
              <span className="ml-2 text-gray-500">kg</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Water Intake
            </label>
            <div className="flex items-center">
              <input
                type="number"
                name="waterIntake"
                value={goals.waterIntake}
                onChange={handleGoalChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                min="4"
                max="20"
              />
              <span className="ml-2 text-gray-500">glasses</span>
            </div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="flex flex-col">
          <div className="h-64 mb-4">
            <Chart 
              type="doughnut" 
              data={chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right'
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}%`
                    }
                  }
                }
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">Steps</p>
              <p className="font-bold">{progress.currentSteps}/{goals.dailySteps}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${completion.steps}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">Workouts</p>
              <p className="font-bold">{progress.completedWorkouts}/{goals.weeklyWorkouts}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${completion.workouts}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-sm text-amber-800">Weight Loss</p>
              <p className="font-bold">{progress.weightLost.toFixed(1)}/{goals.monthlyWeightLoss}kg</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-amber-500 h-2 rounded-full" 
                  style={{ width: `${completion.weight}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-cyan-50 p-3 rounded-lg">
              <p className="text-sm text-cyan-800">Water Intake</p>
              <p className="font-bold">{progress.waterConsumed}/{goals.waterIntake}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-cyan-500 h-2 rounded-full" 
                  style={{ width: `${completion.water}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalSetting;