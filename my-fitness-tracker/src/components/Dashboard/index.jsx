// src/components/Dashboard/index.jsx
import ActivityTracker from './ActivityTracker';
import GoalSetting from './GoalSettings';
//import ProgressDashboard from './ProgressDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActivityTracker />
          <GoalSetting />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;