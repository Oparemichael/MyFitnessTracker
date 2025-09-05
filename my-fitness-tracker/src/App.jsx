import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import SignUp from './components/Auth/SignUp';
import ExerciseExplorer from './pages/ExerciseExplorer';
import ExerciseDetails from './pages/ExerciseDetails';
import WorkoutLog from './pages/WorkoutLog';
import ProgressDashboard from './pages/ProgressDashboard';
import WorkoutHistory from './pages/WorkoutHistory';
import Profile from './pages/ProfilePage';
import WorkoutSession from './pages/WorkoutSession';
import SettingsPage from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/log" element={<WorkoutLog />} />
              <Route path="/history" element={<WorkoutHistory />} />
              <Route path="/progress" element={<ProgressDashboard />} />
              <Route path="/exercises" element={<ExerciseExplorer />} />
              <Route path="/exercises/:id" element={<ExerciseDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/workout-session" element={<WorkoutSession />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
