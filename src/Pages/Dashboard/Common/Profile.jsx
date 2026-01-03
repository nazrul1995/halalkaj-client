import { useContext } from "react";
import { AuthContext } from "../../../Components/Provider/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const role = user.role || "buyer";

  return (
    <div className="w-11/12 max-w-6xl mx-auto mt-28">
      {/* Header */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.photoURL || "https://i.ibb.co/2kRZ0dF/user.png"}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border"
        />

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>

          <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold
            ${role === "admin" && "bg-red-100 text-red-600"}
            ${role === "seller" && "bg-green-100 text-green-600"}
            ${role === "buyer" && "bg-blue-100 text-blue-600"}
          `}>
            {role.toUpperCase()}
          </span>
        </div>

        <button className="btn btn-outline btn-sm">
          Edit Profile
        </button>
      </div>

      {/* Role Based Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* Buyer */}
        {role === "buyer" && (
          <>
            <StatCard title="Applied Jobs" value="12" />
            <StatCard title="Ongoing Jobs" value="4" />
            <StatCard title="Completed Jobs" value="8" />

            <ActionCard
              title="My Applications"
              desc="View all jobs you have applied for"
              btnText="View Applications"
            />
          </>
        )}

        {/* Seller */}
        {role === "seller" && (
          <>
            <StatCard title="Posted Jobs" value="15" />
            <StatCard title="Active Jobs" value="6" />
            <StatCard title="Completed Jobs" value="9" />

            <ActionCard
              title="Manage Jobs"
              desc="View and manage your posted jobs"
              btnText="Manage Jobs"
            />
          </>
        )}

        {/* Admin */}
        {role === "admin" && (
          <>
            <StatCard title="Total Users" value="320" />
            <StatCard title="Total Jobs" value="145" />
            <StatCard title="Pending Reports" value="3" />

            <ActionCard
              title="Admin Panel"
              desc="Manage users, jobs & reports"
              btnText="Go to Dashboard"
              danger
            />
          </>
        )}
      </div>
    </div>
  );
};

/* ---------------- Reusable Components ---------------- */

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-primary">{value}</p>
    </div>
  );
};

const ActionCard = ({ title, desc, btnText, danger }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 md:col-span-3 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
      <button className={`btn ${danger ? "btn-error" : "btn-primary"} btn-sm`}>
        {btnText}
      </button>
    </div>
  );
};

export default Profile;
