import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-100 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-screen">
        <div className="flex justify-between h-16">
          {/* Brand */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 mt-5">
                FitnessTracker
              </span>
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-4 mt-5">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-black hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <Link
                  to="/exercises"
                  className="text-black hover:text-blue-600"
                >
                  Exercise Explorer
                </Link>
                {/* Profile button */}
                <Link
                  to="/profile"
                  className="text-black hover:text-blue-600"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-black hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-black hover:text-blue-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
