// src/components/Dashboard/index.jsx
import ActivityTracker from './ActivityTracker';
import GoalSetting from './GoalSettings';
import ProgressDashboard from './ProgressDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col align-middle items-center pt-12 pb-12">
      <div className="max-w-7xl w-full p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityTracker />
          <GoalSetting />
          <ProgressDashboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;