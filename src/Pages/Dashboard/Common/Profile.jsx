import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Components/Provider/AuthContext";
import RoleApplicationForm from "./RoleApplicationForm";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [openRole, setOpenRole] = useState(null);


  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-6xl mx-auto mt-28 space-y-12">
      {/* ================= Profile Header ================= */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
        {/* Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-warning" />

        <img
          src={user.photoURL || "https://i.ibb.co/2kRZ0dF/user.png"}
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-warning object-cover shadow-md"
        />

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.displayName || "User"}
          </h2>
          <p className="text-gray-500 mt-1">{user.email}</p>

          <span className="inline-block mt-4 px-5 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-semibold">
            Profile Overview
          </span>
        </div>
      </div>

      {/* ================= Apply Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seller Card */}
        <div className="group bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col justify-between border border-gray-100">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-warning transition">
              Become a Seller
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Start earning by accepting tasks and delivering quality work.
            </p>

            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Accept tasks</li>
              <li>Work remotely</li>
              <li>Secure payments</li>
            </ul>
          </div>

          <button
            onClick={() => setOpenRole("seller")}
            className="btn btn-warning mt-6 rounded-full w-full"
          >
            Apply as Seller
          </button>
        </div>

        {/* Buyer Card */}
        <div className="group bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col justify-between border border-gray-100">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-warning transition">
              Become a Buyer
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Post jobs, hire skilled sellers, and manage projects easily.
            </p>

            <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
              <li>Post jobs</li>
              <li>Hire talent</li>
              <li>Manage work</li>
            </ul>
          </div>

          <button
            onClick={() => setOpenRole("buyer")}
            className="btn btn-warning mt-6 rounded-full w-full"
          >
            Apply as Buyer
          </button>
        </div>
      </div>

      {/* ================= Modal ================= */}
      {openRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <RoleApplicationForm
            role={openRole}
            close={() => setOpenRole(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
