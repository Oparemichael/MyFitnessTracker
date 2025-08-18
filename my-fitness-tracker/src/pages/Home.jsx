// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleDemoAccess = () => {
    login(); // Set authentication state
    navigate('/dashboard'); // Then navigate
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 w-screen flex items-center justify-center">
      <div className="max-w-7x1 mx auto px-4 py-16 sm:px-6 lg:px-8">
      {/* ... other content ... */}
         <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-blue-600">My Fitness Tracker</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Track your workouts, monitor progress, and achieve your fitness goals
          </p>
          <div className="mt-10 flex justify-center gap-4"></div>
      <button
        onClick={handleDemoAccess}
        className="..."
      >
        Demo Dashboard
      </button>
      </div>
      </div>
    </div>
  );
};

export default Home;