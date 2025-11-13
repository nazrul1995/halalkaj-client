// src/pages/MyPostedJobs.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Components/Provider/AuthContext";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?.accessToken) return;

      try {
        const res = await fetch(
          `https://halalkaj-server.vercel.app/my-posted-jobs?email=${user.email}`,
          {
            headers: { authorization: `Bearer ${user.accessToken}` },
          }
        );

        if (!res.ok) throw new Error("Failed to load jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const handleDelete = (jobId) => {
    Swal.fire({
      title: "Delete Job?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://halalkaj-server.vercel.app/deleteJob/${jobId}`, {
            method: "DELETE",
            headers: { authorization: `Bearer ${user.accessToken}` },
          });

          if (res.ok) {
            setJobs(jobs.filter((j) => j._id !== jobId));
            Swal.fire("Deleted!", "Job has been removed.", "success");
          } else {
            const error = await res.json();
            throw new Error(error.message || "Delete failed");
          }
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-700">
                My <span className="text-warning">Posted Jobs</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage, edit, or delete your active job posts</p>
            </div>
            <Link
              to="/post-job"
              className="btn bg-green-900 hover:bg-green-800 text-white rounded-full px-8 py-3 shadow-lg transform transition-all hover:scale-105 flex items-center gap-3 text-lg font-semibold"
            >
              <i className="fas fa-plus-circle text-xl"></i>
              Post New Job
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center border border-gray-200">
            <div className="bg-gray-100 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
              <i className="fas fa-briefcase text-6xl text-gray-300"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No Jobs Posted Yet</h3>
            <p className="text-gray-500 mb-8">Start hiring top talent today!</p>
            <Link
              to="/post-job"
              className="btn bg-green-900 hover:bg-green-800 text-white rounded-full px-10 py-3 shadow-lg transform transition-all hover:scale-105"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table - Premium Design */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-green-900 to-green-800 text-white p-5">
                <h2 className="text-xl font-bold">Active Job Listings</h2>
              </div>
              <table className="table w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    <th className="py-5 px-6">Job Details</th>
                    <th className="py-5 px-6 text-center">Category</th>
                    <th className="py-5 px-6 text-center">Budget</th>
                    <th className="py-5 px-6 text-center">Proposals</th>
                    <th className="py-5 px-6 text-center">Status</th>
                    <th className="py-5 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr
                      key={job._id}
                      className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-white transition-all duration-300"
                    >
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-5">
                          <div className="relative group">
                            <img
                              src={job.coverImage}
                              alt={job.title}
                              className="w-20 h-20 rounded-xl object-cover shadow-md ring-2 ring-gray-200 group-hover:ring-warning transition-all"
                              onError={(e) => (e.target.src = "https://via.placeholder.com/80")}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-green-900 transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <i className="fas fa-hashtag"></i> {job._id.slice(-6)}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <i className="fas fa-calendar-alt"></i>
                                {new Date(job.postedAt).toLocaleDateString("en-US", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm shadow-sm">
                          {job.category}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="text-2xl font-bold text-green-700">${job.price}</span>
                      </td>
                      <td className="text-center">
                        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold text-lg shadow-sm">
                          <i className="fas fa-users"></i>
                          {job.proposals?.length || 0}
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="inline-block px-5 py-2 bg-green-100 text-green-800 rounded-full font-bold text-sm shadow-sm">
                          Active
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="flex gap-3 justify-center">
                    
                          {/* Edit - White */}
                          <Link
                            to={`/update-job/${job._id}`}
                            className="btn btn-ghost border-2 border-gray-300 rounded-full px-5 py-2 hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 transition-all flex items-center gap-2 font-semibold"
                          >
                            <i className="fas fa-edit"></i> Edit
                          </Link>

                          {/* Delete - White + Red */}
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="btn btn-ghost border-2 border-red-300 text-red-600 rounded-full px-5 py-2 hover:bg-red-50 hover:border-red-500 transform hover:scale-105 transition-all flex items-center gap-2 font-semibold"
                          >
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card - Premium */}
            <div className="lg:hidden space-y-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex gap-5 mb-5">
                    <div className="relative group">
                      <img
                        src={job.coverImage}
                        alt={job.title}
                        className="w-24 h-24 rounded-xl object-cover shadow-lg ring-2 ring-gray-200 group-hover:ring-warning transition-all"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/96")}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-green-900 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1">
                          <i className="fas fa-hashtag"></i> {job._id.slice(-6)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <i className="fas fa-calendar-alt"></i>
                          {new Date(job.postedAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-blue-50 p-3 rounded-xl text-center">
                      <p className="text-gray-600 font-medium">Category</p>
                      <p className="font-bold text-blue-700">{job.category}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-xl text-center">
                      <p className="text-gray-600 font-medium">Budget</p>
                      <p className="font-bold text-2xl text-green-700">${job.price}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl text-center">
                      <p className="text-gray-600 font-medium">Proposals</p>
                      <p className="font-bold text-lg text-purple-700 flex items-center justify-center gap-1">
                        <i className="fas fa-users"></i> {job.proposals?.length || 0}
                      </p>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-xl text-center">
                      <p className="text-gray-600 font-medium">Status</p>
                      <p className="font-bold text-emerald-700">Active</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/update-job/${job._id}`}
                      className="flex-1 btn btn-ghost border-2 border-gray-300 rounded-full py-3 hover:bg-gray-50 transform hover:scale-105 transition-all font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="flex-1 btn btn-ghost border-2 border-red-300 text-red-600 rounded-full py-3 hover:bg-red-50 transform hover:scale-105 transition-all font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPostedJobs;