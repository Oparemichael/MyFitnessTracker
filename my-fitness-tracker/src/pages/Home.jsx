// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const handleDemoAccess = () => {
    login(); // Set authentication state
    navigate('/dashboard'); // Then navigate
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup'); // Fixed: Now navigates to signup page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 w-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-blue-600">My Fitness Tracker</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Track your workouts, monitor progress, and achieve your fitness goals
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleDemoAccess}
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Demo Dashboard
            </button>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleLogin}
                className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Login
              </button>
              <button
                onClick={handleSignUp}
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            <p>Try the demo dashboard or create your own account to get started</p>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-500 text-2xl mb-4">
                <i className="fas fa-dumbbell"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Exercise Library</h3>
              <p className="text-gray-500">Access hundreds of exercises with detailed instructions and demonstrations.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-500 text-2xl mb-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-500">Monitor your progress with detailed charts and statistics over time.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-500 text-2xl mb-4">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Workout Plans</h3>
              <p className="text-gray-500">Create and follow customized workout plans tailored to your goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;