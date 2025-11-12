import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Components/Provider/AuthContext";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch jobs by user email
  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://halalkaj-server.vercel.app/my-posted-jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // 🗑 Delete job
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://halalkaj-server.vercel.app/deleteJob/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setJobs((prev) => prev.filter((job) => job._id !== id));
              Swal.fire("Deleted!", "The job has been removed.", "success");
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600 text-lg">
        Loading your posted jobs...
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
        <img
          src="https://i.ibb.co/Jt3pJwC/no-data.png"
          alt="No Jobs"
          className="w-52 mb-4 opacity-80"
        />
        <p className="text-lg">You haven’t posted any jobs yet.</p>
        <Link
          to="/post-job"
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post a New Job
        </Link>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-10">
      <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Jobs by: {user.displayName || user.email}
      </h3>

      {/* 🧩 List Layout (2 per row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition flex"
          >
            {/* Left Image */}
            <img
              src={
                job.coverImage ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={job.title}
              className="w-40 h-40 object-cover"
            />

            {/* Right Content */}
            <div className="p-4 flex flex-col justify-between w-full">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h2>
                <p className="text-sm text-blue-500 mb-1">{job.category}</p>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {job.summary}
                </p>
                <p className="text-sm text-gray-500">
                  💰 <span className="font-medium text-gray-800">${job.price}</span> | ⏰{" "}
                  {new Date(job.deadline).toLocaleDateString("en-US")}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-3">
                <Link
                  to={`/update-job/${job._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPostedJobs;
