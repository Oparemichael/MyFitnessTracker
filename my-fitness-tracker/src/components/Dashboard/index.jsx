// src/components/Dashboard/index.jsx
import { useAuth } from '../../contexts/AuthContext';
import ActivityTracker from './ActivityTracker';
import GoalSetting from './GoalSettings';
import ProgressDashboard from './ProgressDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col align-middle items-center pt-12 pb-12">
      <div className="max-w-7xl w-full p-6">
        {/* ✅ Welcome message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {user?.firstName 
            ? `Welcome, ${user.firstName}! 🎉` 
            : 'Welcome to your Dashboard 🎉'}
        </h1>

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
