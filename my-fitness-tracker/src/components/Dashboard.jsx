import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <nav className="mt-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="#activity" className="text-blue-600 hover:text-blue-800">
                  Activity Tracker
                </Link>
              </li>
              <li>
                <Link to="#goals" className="text-blue-600 hover:text-blue-800">
                  Goal Setting
                </Link>
              </li>
              <li>
                <Link to="#progress" className="text-blue-600 hover:text-blue-800">
                  Progress Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Activity Tracker Card */}
          <section 
            id="activity" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Activity Tracker</h2>
            <p className="text-gray-600 mb-4">
              Track steps, distance, calories burned, and more.
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Steps:</span>
                <span className="font-medium">8,542</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Distance:</span>
                <span className="font-medium">5.2 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Calories:</span>
                <span className="font-medium">1,250</span>
              </div>
            </div>
          </section>

          {/* Goal Setting Card */}
          <section 
            id="goals" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Goal Setting</h2>
            <p className="text-gray-600 mb-4">
              Set daily, weekly, and monthly fitness goals
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Daily Goal</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Weekly Goal</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{width: '50%'}}></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">Monthly Goal</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Progress Dashboard Card */}
          <section 
            id="progress" 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Progress Dashboard</h2>
            <p className="text-gray-600 mb-4">
              View your activity trends and goal progress
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="text-sm font-medium text-green-600">+12%</span>
              </div>
              <div className="h-40 bg-white rounded border border-gray-200 p-2">
                {/* Placeholder for chart - in a real app you'd use a charting library */}
                <div className="flex items-end h-full space-x-1">
                  {[30, 50, 70, 60, 80, 90, 65].map((height, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-500 w-8 rounded-t hover:bg-blue-600 transition-colors" 
                      style={{height: `${height}%`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;