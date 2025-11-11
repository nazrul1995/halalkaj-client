import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import { IoLogIn, IoLogOut } from 'react-icons/io5';
import { FaGear, FaUser } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, LogOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? 'dark' : 'light');

  const handleLogOut = () => {
    LogOutUser()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Logout failed',
          text: err.message,
        });
      });
  };

  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          `block px-2 py-1 rounded hover:bg-blue-100 ${
            isActive ? 'font-bold text-blue-600' : ''
          }`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block px-2 py-1 rounded hover:bg-blue-100 ${
            isActive ? 'font-bold text-blue-600' : ''
          }`
        }
        to="/all-jobs"
      >
        All Jobs
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block px-2 py-1 rounded hover:bg-blue-100 ${
            isActive ? 'font-bold text-blue-600' : ''
          }`
        }
        to="/add-job"
      >
        Add a Job
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block px-2 py-1 rounded hover:bg-blue-100 ${
            isActive ? 'font-bold text-blue-600' : ''
          }`
        }
        to="/my-task"
      >
        My Tasks
      </NavLink>
    </>
  );

  return (
    <div className='sticky'>
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-11/12 mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HalalKaj
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3">{links}</div>

        {/* Right Side (Theme + User/Auth) */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={theme === 'dark'}
            onChange={(e) => handleTheme(e.target.checked)}
          />

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border border-gray-300 overflow-hidden">
                  <img
                    src={
                      user.photoURL ||
                      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                    }
                    alt={user.displayName}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 mt-3"
              >
                <li className="font-bold">{user.displayName}</li>
                <li className="text-xs text-gray-500 mb-2">{user.email}</li>
                <li>
                  <Link to="/profile">
                    <FaUser className="inline mr-2" /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings">
                    <FaGear className="inline mr-2" /> Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm w-full mt-2 bg-gradient-to-r from-pink-500 to-red-500 text-white"
                  >
                    <IoLogOut className="inline mr-1" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center gap-1"
              >
                <IoLogIn /> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline btn-sm border-blue-500 text-blue-600 rounded-full"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden btn btn-ghost p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      
    </nav>{/* Mobile Menu (bottom of all items) */}
      {menuOpen && (
        <div className="lg:hidden bg-white w-11/12 mx-auto shadow-md py-3 border-t">
          <div className="flex flex-col gap-2 px-4">{links}</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
