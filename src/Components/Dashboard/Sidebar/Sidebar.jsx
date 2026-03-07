import React, { useContext, useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router";
import MenuItem from "./Menu/MenuItem";
import BuyerMenu from "./Menu/BuyerMenu";
import SellerMenu from "./Menu/SellerMenu";
import AdminMenu from "./Menu/AdminMenu";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";

const Sidebar = () => {
  const {LogOutUser} = useContext(AuthContext)
  const [isActive, setIsActive] = useState(false);
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
  return (
    <>
      {/* ===== Mobile Navbar ===== */}
      <div className="md:hidden flex items-center justify-between bg-warning px-4 py-3 text-white shadow-md">
        <Link to="/" className="text-xl font-bold">
          Halal<span className="text-green-900">Kaj</span>
        </Link>
        <button onClick={() => setIsActive(!isActive)}>
          <FiMenu size={26} />
        </button>
      </div>

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300
        ${isActive ? "-translate-x-full" : "translate-x-0"}
        md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* ===== Logo ===== */}
          <div className="hidden md:flex items-center justify-center h-20 border-b bg-warning text-white">
            <Link to="/" className="text-2xl font-extrabold tracking-wide">
              Halal<span className="text-green-900">Kaj</span>
            </Link>
          </div>

          {/* ===== Menu ===== */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">
              Dashboard
            </p>

            <MenuItem
              icon={BsGraphUp}
              label="Statistics"
              address="/dashboard"
            />

            {/* Role Based */}
            <BuyerMenu />
            <SellerMenu />
            <AdminMenu />
          </nav>

          {/* ===== Bottom Section ===== */}
          <div className="border-t px-3 py-4">
            <MenuItem
              icon={CgProfile}
              label="Profile"
              address="/dashboard/profile"
            />

            <button onClick={handleLogOut}
              className="flex items-center w-full px-4 py-2 mt-3 rounded-lg
              text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
            >
             LogOut
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
