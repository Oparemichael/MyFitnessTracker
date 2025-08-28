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
import ProgressPage from './pages/Progresspage';
import WorkoutHistory from './pages/WorkoutHistory';


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
              <Route path="/exercises" element={<ExerciseExplorer />} /> 
              <Route path="/exercises/:id" element={<ExerciseDetails />} />
              <Route path="/log-workout" element={<WorkoutLog />} />
              <Route path="/Progrss" element={<ProgressPage />} />
              <Route path="/workout-history" element={<WorkoutHistory />} />
  
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
