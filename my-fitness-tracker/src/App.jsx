// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import NotFound from './Pages/Notfound';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} /> {/* Should be last */}
          </Route>
</Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
// src/App.jsx
