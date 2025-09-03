import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-100 shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-screen">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link
              to={user ? "/dashboard" : "/"}
              className="flex items-center text-xl font-bold text-blue-600"
            >
              FitnessTracker
            </Link>
          </div>

          {/* Desktop Menu */}
          {user ? (
            <div className="hidden md:flex items-center space-x-6">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                      : "text-black hover:text-blue-600 transition"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <NavLink
                to="/profile"
                className="text-black hover:text-blue-600 transition"
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-black hover:text-blue-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex">
              <Link
                to="/login"
                className="text-black hover:text-blue-600 transition"
              >
                Login
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && user && (
          <div className="md:hidden bg-gray-100 px-4 pt-2 pb-4 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block text-black hover:text-blue-600 transition"
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block text-black hover:text-blue-600 transition"
            >
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="block text-black hover:text-blue-600 transition w-full text-left"
            >
              Logout
            </button>
          </div>
        )}

        {!user && menuOpen && (
          <div className="md:hidden bg-gray-100 px-4 pt-2 pb-4">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-black hover:text-blue-600 transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
