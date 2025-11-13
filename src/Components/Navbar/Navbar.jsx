import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, LogOutUser } = useContext(AuthContext);
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "green");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "green");

  const handleLogOut = () => {
    LogOutUser()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Logout failed",
          text: err.message,
        });
      });
  };

  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          `block px-2 py-1 rounded hover:bg-white/20 transition ${
            isActive ? "font-bold text-yellow-400" : "text-white"
          }`
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block px-2 py-1 rounded hover:bg-white/20 transition ${
            isActive ? "font-bold text-yellow-400" : "text-white"
          }`
        }
        to="/all-jobs"
      >
        All Jobs
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block px-2 py-1 rounded hover:bg-white/20 transition ${
            isActive ? "font-bold text-yellow-400" : "text-white"
          }`
        }
        to="/add-job"
      >
        Add a Job
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `block px-2 py-1 rounded hover:bg-white/20 transition ${
            isActive ? "font-bold text-yellow-400" : "text-white"
          }`
        }
        to="/my-task"
      >
        My Tasks
      </NavLink>
    </>
  );

  const isHome = location.pathname === "/";
  const navbarBg = isHome ? (scrolled ? "bg-green-950 text-white shadow-md" : "bg-transparent text-white") : "bg-green-950 text-white";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${navbarBg}`}>
      <div className="w-11/12 mx-auto flex items-center justify-between py-3">
        <Link
          to="/"
          className={`text-2xl font-bold transition-colors duration-500 text-white`}
        >
          HalalKaj
        </Link>

        <div className="hidden lg:flex items-center gap-3">{links}</div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="toggle toggle-sm"
            checked={theme === "dark"}
            onChange={(e) => handleTheme(e.target.checked)}
          />

          {user ? (
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => setShowUserCard(prev => !prev)} // ক্লিক দিয়ে টগল
              >
                <img
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  alt={user.displayName || "User"}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              {showUserCard && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-gray-200">
                    <p className="font-semibold text-sm text-gray-800 truncate">{user.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <IoLogOut className="text-lg" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm  from-yellow-400 to-green-400 text-white rounded-full flex items-center gap-1 transition-colors duration-500"
              >
                <IoLogIn /> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline btn-sm border-yellow-400 text-yellow-400 rounded-full transition-colors duration-500"
              >
                Register
              </Link>
            </>
          )}

          <button className="lg:hidden btn btn-ghost p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-green-950 w-11/12 mx-auto shadow-md py-3 border-t">
          <div className="flex flex-col gap-2 px-4">{links}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
